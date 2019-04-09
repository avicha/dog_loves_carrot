import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Carrot extends Sprite {
    constructor(...args) {
        super(...args)
        this.setTexture(resources.carrot)
        //添加跑的动画
        this.addAnimation('run', [0, 1, 2], 100)
        //添加被咬时警告的动画
        this.addAnimation('warn', [3, 4, 5, 4], 100)
        this.setCurrentAnim('run')
    }
    update(dt) {
        super.update(dt)
        //如果被咬着但当前动画不是警告则设置为警告
        if (this.isBeated && this.currentAnimation != this.animations.warn) {
            this.setCurrentAnim('warn')
        }
        //如果没有被咬着但当前动画不是跑动则设置为跑动
        if (!this.isBeated && this.currentAnimation != this.animations.run) {
            this.setCurrentAnim('run')
        }
    }
}