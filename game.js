import Engine from 'prime/engine'
import Menu from 'app/scenes/menu'
import Loading from 'app/scenes/loading'
import Main from 'app/scenes/main'


let game = new Engine({
    debug: true,
    stageScaleMode: 'cover',
    fps: 60,
    orientation: 'landscape'
})
game.setStageSize(1280, 720)
game.launch(Loading)
game.on('switchScene', (sceneName, ...args) => {
    switch (sceneName) {
        case 'Loading':
            return game.launch(Loading, ...args)
        case 'Menu':
            return game.launch(Menu, ...args)
        case 'Main':
            return game.launch(Main, ...args)
    }
})
game.on('error', ({
    message,
    stack
}) => {
    console.error(message)
})