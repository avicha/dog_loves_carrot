import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Bone extends Sprite {
    constructor(...args) {
        super(...args)
        this.setTexture(resources.boneSprite)
        //扔骨头的动画
        this.addAnimation('throw', [0, 1, 2, 3], 100)
        this.setCurrentAnim('throw')
    }
    setTarget(targetX, targetY) {
        //扔的目标位置
        this.targetX = targetX
        this.targetY = targetY
        //扔的时间控制
        let t = 1
        //扔的开始位置
        let startX = this.position.x + this.shape.pivot.x
        let startY = this.position.y + this.shape.pivot.y
        //扔的速度
        this.speed.x = (this.targetX - startX) / t
        this.speed.y = -1.5 * this.speed.x
        //扔的加速度
        this.acceleration.y = 2 * (this.targetY - startY - this.speed.y * t) / (t * t)
    }
    update(dt) {
        super.update(dt)
        this.trigger('checkCollide', this)
    }
}