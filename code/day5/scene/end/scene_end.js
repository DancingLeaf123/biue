var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('r', function(){
        var s = SceneTitle(game)
        game.replaceScene(s)
    })

    // 初始化
    s.draw = function() {
        // draw labels
        game.context.fillStyle = "black"
        game.context.fillText('按 R  重启游戏', 100, 290)
    }
    s.update = function() {

    }
    return s
}
