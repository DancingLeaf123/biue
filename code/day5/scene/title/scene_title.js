var SceneTitle = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('k', function(){
        var s = Scene(game)
        game.replaceScene(s)
    })

    // 初始化
    s.draw = function() {
        // draw labels
        game.context.fillText('按 k 开始游戏', 100, 190)
        game.context.fillText('按 a,d 操作挡板左右移动', 100, 200)

    }
    s.update = function() {

    }
    return s
}
