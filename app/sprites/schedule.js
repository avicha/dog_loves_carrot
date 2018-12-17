import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Schedule extends Sprite {
    constructor(...args) {
        super(...args)
        this.texture = resources.schedule
        this.progress = 0
    }
    setProgress(progress) {
        this.progress = progress
    }
    draw(ctx) {
        // 加载进度条，根据进度显示纹理的比例
        if (this.progress) {
            var w = this.texture.sizeWidth * this.progress
            var h = this.texture.sizeHeight
            ctx.drawImage(this.texture.canvas, 0, 0, w, h, this.position.x, this.position.y, w, h)
        }
    }
}