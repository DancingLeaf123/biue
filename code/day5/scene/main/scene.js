var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    blocks = loadLevel(game, nowLevel)
    alives = blocks.length
    nextctn = ""
    // log('blocks', blocks)



    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })



    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        if (nowLevel >= 2) {
            game.drawtype2(paddle)
        }else {
            game.drawImage(paddle)
        }
        game.drawImage(ball)
        // draw blocks
        for (let i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                if (block.lifes == 2) {
                    game.drawtype2(block)
                    continue
                }
                else{game.drawImage(block)
                }
            }
        }
        // draw labels
        game.context.fillStyle = "white"
        game.context.fillText('难度1~100: ' + Number(window.fps), 5, 270)
        game.context.fillText('分数: ' + score, 5, 280)
        game.context.fillText('剩余生命: ' + userLife, 5, 290)
        game.context.fillText('level: ' + blocks.length, 180, 20)
        game.context.fillText( nextctn, 180, 100)

    }
    s.update = function() {
        if (window.paused) {
            return
        }
        njdu = window.fps

        log("nowLevel",nowLevel)

        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            if (! userLife) {
                // 跳转到 游戏结束 的场景
                var end = SceneEnd(game)
                game.replaceScene(end)
            }else{
                userLife --
                var s = Scene(game)
                game.replaceScene(s)
            }
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            // log('alives', alives)
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                log('alive', block.alive)
                ball.反弹()
                // 更新分数
                score += 100
                if (block.alive == false && alives>0 ) {
                    log('alives', alives)
                    alives --
                    log('alives', alives)
                    if (alives == 0 && blocks.length<=2) {
                        setTimeout(function () {
                            window.paused = true
                            nextctn = "按 N 进入 下一关, 按 P 继续游戏"
                            window.addEventListener('keydown', function (event) {
                                let k = event.code
                                if (k == 'KeyN') {
                                    nextctn = ""
                                    blocks = loadLevel(game, blocks.length + 1)
                                    alives = blocks.length
                                    nowLevel = blocks.length
                                    window.fps += 5
                                }
                            })
                        },500)
                    }
                    if (alives == 0 && blocks.length >2) {
                        //跳转到you win 场景
                        setTimeout(function () {
                            var s = SceneWin(game)
                            game.replaceScene(s)
                        },500)
                    }
                }
            }
        }


    }

    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, event)
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            log(x, y, 'drag')
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        log(x, y, 'up')
        enableDrag = false
    })

    return s
}
