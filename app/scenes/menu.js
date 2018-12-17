import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import resources from '../resources'
import Enter from '../sprites/enter'

export default class Menu extends Scene {
    constructor(game) {
        super(game)
        // 菜单页面背景
        this.menuBg = this.addGameObject(new Sprite(0, 0, 0, resources.menuBg))
        // 进入游戏按钮
        this.enterButton = this.addGameObject(new Enter(252, 153, 1, {
            texture: resources.enterButton
        }))
        // 移动经过改变进入按钮的样式
        this.on('touchmove', e => {
            if (e.target === this.enterButton) {
                this.enterButton.setCurrentAnim('mousein')
            } else {
                this.enterButton.setCurrentAnim('mouseout')
            }
        })
        // 点击开始游戏
        this.on('tap', e => {
            if (e.target == this.enterButton) {
                this.trigger('switchScene', 'Main')
            }
        })
    }
}