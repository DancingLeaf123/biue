var SceneEditor = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    var save = function () {
        var data =JSON.stringify(editorBlocks);
        // log("data", data)
        window.localStorage.setItem(`editorBlocks`,data);
        // log("window.localStorage", window.localStorage)
    }

    game.registerAction('s', function(){
    })

    window.fps = 5
    var paddle = Paddle(game)
    var ball = Ball(game)
    log('editorBlocks',editorBlocks)

    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#554"
        game.context.fillRect(0, 0, 400, 300)
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw blocks
        for (let i = 0; i < editorBlocks.length; i++) {
            var block = editorBlocks[i]
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
        game.context.fillText('关卡编辑界面: ', 5, 280)

    }
    s.update = function() {

        if (window.paused) {
            return
        }
        // log("nowLevel",nowLevel)
        ball.move()
        // 判断游戏结束

        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < editorBlocks.length; i++) {
            // log('alives', alives)
            var block = editorBlocks[i]
            var alives = editorBlocks.length
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
                    if (alives == 0) {
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
    // var enableDrag = false
    // window.fps = 2
   //  window.addEventListener('click', function () {
   //      log(1)
   //  })
    game.canvas.addEventListener('mousedown',function(event) {
        var button = event.button
        var x = event.offsetX
        var y = event.offsetY
        var needx = (parseInt(x / 40) * 40)
        var needy = (parseInt(y / 19) * 19)
        // log(x, y, event)
        // log(needx, needy, event)
        var n = 1
        var p = [needx, needy, n]

        // log(event)
        if(button == 0){
            if (editorBlocks.length == 0){
                // log("editorBlocks.length == 0")
                let block = Block(game, p)
                editorBlocks.push(block)
            }else {
                let haddosomething = false
                for (var i = 0; i < editorBlocks.length; i++) {
                    // log('haddosomething', haddosomething)
                    // log('editorBlocks[i]', editorBlocks[i])
                    if (editorBlocks[i].hasPoint(x, y)) {
                        // log('editorBlocks[i].hasPoint(x, y)',editorBlocks[i].hasPoint(x, y))
                        if (editorBlocks[i].lifes == 1) {
                            editorBlocks[i].lifes += 1
                        }
                        haddosomething = true
                        // log('haddosomething', haddosomething)
                        break;
                    }
                    else if (editorBlocks[i].hasPoint(x, y) == false) {
                        continue;
                    }
                }
                if (haddosomething == false) {

                    let block = Block(game, p)
                    editorBlocks.push(block)
                    haddosomething = true
                }
            }
            log('editorBlocks', editorBlocks)
        }
        else if(button == 2){
            let haddosomething = false
            for (var i = 0; i < editorBlocks.length; i++) {
                // log('haddosomething', haddosomething)
                // log('editorBlocks[i]', editorBlocks[i])
                if (editorBlocks[i].hasPoint(x, y)) {
                    // log('editorBlocks[i].hasPoint(x, y)',editorBlocks[i].hasPoint(x, y))
                    if (editorBlocks[i].lifes == 2) {
                        editorBlocks[i].lifes -= 1
                    }else if (editorBlocks[i].lifes == 1) {
                        editorBlocks.splice(i,1)
                    }
                    haddosomething = true
                    // log('haddosomething', haddosomething)
                    break;
                }
                else if (editorBlocks[i].hasPoint(x, y) == false) {
                    continue;
                }
            }
            // log(editorBlocks.length)
            // if (haddosomething == false) {
            //     let block = Block(game, p)
            //     editorBlocks.push(block)
            //     haddosomething = true
            // }
        }
        save()
        // fetch()
    })
    // game.canvas.addEventListener('mousemove', function(event) {
    //     var x = event.offsetX
    //     var y = event.offsetY
    //     // log(x, y, 'move')
    //     if (enableDrag) {
    //         log(x, y, 'drag')
    //         ball.x = x
    //         ball.y = y
    //     }
    // })
    // game.canvas.addEventListener('mouseup', function(event) {
    //     var x = event.offsetX
    //     var y = event.offsetY
    //     log(x, y, 'up')
    //     enableDrag = false
    // })
    return s
}
