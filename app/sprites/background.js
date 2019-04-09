import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Background extends Sprite {
    constructor(...args) {
        super(...args)
        this.distance = this.distance || 1
        //近大远小，造成视差
        if (this.distance != 1) {
            this.speed.divideSelf(this.distance)
        }
        //初始化temp背景
        // 横向重复
        if (this.repeatH) {
            this.temp = new Background(this.position.x + (this.speed.x > 0 ? -1 : 1) * this.texture.sizeWidth, this.position.y, this.z, {
                speed: this.speed,
                texture: this.texture,
                stageWidth: this.stageWidth,
                stageHeight: this.stageHeight
            })
        }
        // 纵向重复
        if (this.repeatV) {
            this.temp = new Background(this.position.x, this.position.y + (this.speed.y > 0 ? -1 : 1) * this.texture.sizeHeight, this.z, {
                speed: this.speed,
                texture: this.texture,
                stageWidth: this.stageWidth,
                stageHeight: this.stageHeight
            })
        }
    }
    update(dt) {
        super.update(dt)
        if (this.temp) {
            this.temp.update(dt)
        }
        // 横向重复
        if (this.repeatH) {
            // 向右移出屏幕，重新拼接到克隆体前面
            if (this.speed.x > 0 && (this.position.x > this.stageWidth)) {
                this.setPositionX(this.temp.position.x - this.texture.sizeWidth)
            }
            // 向左移出屏幕，重新拼接到克隆体后面
            if (this.speed.x < 0 && (this.position.x < -this.texture.sizeWidth)) {
                this.setPositionX(this.temp.position.x + this.temp.texture.sizeWidth)
            }
            // 克隆体向右移出屏幕，重新拼接到本体前面
            if (this.temp.speed.x > 0 && (this.temp.position.x > this.stageWidth)) {
                this.temp.setPositionX(this.position.x - this.temp.texture.sizeWidth)
            }
            // 克隆体向左移出屏幕，重新拼接到本体前面
            if (this.temp.speed.x < 0 && (this.temp.position.x < -this.temp.texture.sizeWidth)) {
                this.temp.setPositionX(this.position.x + this.texture.sizeWidth)
            }
        }
        // 纵向重复
        if (this.repeatV) {
            // 向下移出屏幕，重新拼接到克隆体上面
            if (this.speed.y > 0 && (this.position.y > this.stageHeight)) {
                this.setPositionY(this.temp.position.y - this.texture.sizeHeight)
            }
            // 向上移出屏幕，重新拼接到克隆体下面
            if (this.speed.y < 0 && (this.position.y < -this.texture.sizeHeight)) {
                this.setPositionY(this.temp.position.y + this.temp.texture.sizeHeight)
            }
            // 克隆体向下移出屏幕，重新拼接到本体上面
            if (this.temp.speed.y > 0 && (this.temp.position.y > this.stageHeight)) {
                this.temp.setPositionY(this.position.y - this.temp.texture.sizeHeight)
            }
            // 克隆体向上移出屏幕，重新拼接到本体下面
            if (this.temp.speed.y < 0 && (this.temp.position.y < -this.temp.texture.sizeHeight)) {
                this.temp.setPositionY(this.position.y + this.texture.sizeHeight)
            }
        }
    }
    draw(ctx) {
        this.texture.drawTile(ctx, this.position.x, this.position.y)
        if (this.temp) {
            this.temp.draw(ctx)
        }
    }
}