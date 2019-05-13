var SceneEditor = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    editorBlocks = []

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
                game.drawImage(block)
            }
        }


        // draw labels
        game.context.fillStyle = "white"

        game.context.fillText('关卡编辑界面: ' + blocks.length, 180, 20)


    }
    s.update = function() {




        // 判断游戏结束

        // 判断相撞

        // 判断 ball 和 blocks 相撞


    }

    // mouse event
    // var enableDrag = false
    var existedBlock = function (block, x, y) {
        if (block.hasPoint(x, y)) {
            return true
        }
        return false
    }
    game.canvas.addEventListener('mousedown', function(event) {
        // 40 19 向下取整
        // 0 0 是在00
        // 40 19 也在00
        // 41 19在 41 0
        // 40 28在 0 19
        // 0 40 80 120
         // 0 19 38 57
        var x = event.offsetX
        var y = event.offsetY
        var needx = (parseInt(x / 40) * 40)
        var needy = (parseInt(y / 19) * 19)
        // log(x, y, event)
        // log(needx, needy, event)
        var n = 1
        var p = [needx, needy, n]
        var block = Block(game, p)

        if (editorBlocks.length == 0){
            editorBlocks.push(block)
        }else {
            for (let i = 0; i < editorBlocks.length; i++) {
                log('editorBlocks.length', editorBlocks.length)
                log("for")
                if (editorBlocks[i].hasPoint(x, y)) {
                        editorBlocks[i].lifes += 1
                }else {
                    editorBlocks.push(block)
                }
            }
        }

        // if (existedBlock(block, x, y)) {
        //         editorBlocks.push(blockitem)
        // }
        // editorBlocks.push(block)
        // var block = Block(game, p)
        // 就是当此处没有的时候push
        // 如何判断此处有没有呢？
        // log(block)
        // log("x", "y", x, y)
        // log("o.x", "o.x+o.w","o.y","o.y+o.h", block.x, block.x+block.w, block.y, block.y+block.h)

        // log(block.hasPoint(x, y))

        // if (block.hasPoint(x, y)) {
        //     n++
        //     log('n',n)
        //     p = [needx, needy, n]
        //     block = Block(game, p)
        //     editorBlocks.push(block)
        // }else {
        //     editorBlocks.push(block)
        // }



            // 设置拖拽状态
            // enableDrag = true

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
