import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Stick extends Sprite {
    constructor(...args) {
        super(...args)
        this.setTexture(resources.stickSprite)
        //扔木棍的动画
        this.addAnimation('throw', [0, 1, 2, 1, 0], 100)
        this.setCurrentAnim('throw', 1)
    }
    update(dt) {
        super.update(dt)
        // 木棍只显示一次，动画结束后删掉
        if (this.currentAnimation.ended) {
            this.kill()
        }
    }
}