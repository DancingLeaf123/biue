var loadLevel = function (game,n) {
    var n = n - 1

    var level = levels[n]
    var blocks = []
    for (let i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
        // log('blocks.n',blocks.n)
    }
    return blocks
}
// 全局参数
score = 0
userLife = 3
nowLevel = null || 1
editorBlocks = []


var blocks = []
var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        let k = event.code
        // log(event)
        // log(k)
        if (k == 'KeyP') {
            //debug  暂停
            window.paused = !window.paused
        } else if ('Digit1Digit2Digit3Digit4Digit5Digit6Digit7'.includes(k)) {
            //debug  载入关卡
            // log('k[5]',k[5])
                blocks = loadLevel(game, Number(k[5]))
                nowLevel = blocks.length
                alives = blocks.length
                // log('blocks', blocks)

        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        if (input.value <=30) {
            window.fps = 30
        }else {
            window.fps = Number(input.value )
        }
        log(window.fps);
    })
}

var __main = function() {
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        block2: 'img/block2.png',
        paddle: 'img/paddle.png',
        paddle2: 'img/paddle2.png',

    }
    var game = GuaGame(30, images, function(g){
        var s = SceneTitle(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)
}

__main()
