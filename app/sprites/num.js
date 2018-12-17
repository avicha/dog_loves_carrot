import Sprite from '../../prime/sprite'
import Text from '../../prime/ui/text'
import Adapter from '../../prime/adapter'
import resources from '../resources'

export default class Num extends Sprite {
    constructor(...args) {
        super(...args)
        this._init()
    }
    _init() {
        let str = this.text
        let arr = []
        //计算出帧序列
        for (let i = 0, l = str.length; i < l; i++) {
            if (str[i] == '*') {
                arr[i] = 10
            } else {
                arr[i] = Number(str[i])
            }
        }
        //填充到缓冲区画板
        this.canvas = Adapter.createCanvas()
        this.canvas.width = str.length * this.texture.sizeWidth
        this.canvas.height = this.texture.sizeHeight
        let ctx = this.canvas.getContext('2d')
        for (let i = 0, l = str.length; i < l; i++) {
            this.texture.drawTile(ctx, i * this.texture.sizeWidth, 0, arr[i])
        }
        // 默认左对齐
        this.offsetX = 0
        //根据对齐方式设置偏移
        if (this.align == Text.ALIGN.CENTER) {
            this.offsetX = this.canvas.width / 2
        }
        if (this.align == Text.ALIGN.RIGHT) {
            this.offsetX = this.canvas.width
        }
        // 默认上对齐
        this.offsetY = 0
        if (this.valign == Text.VALIGN.MIDDLE) {
            this.offsetY = this.canvas.height / 2
        }
        if (this.valign == Text.VALIGN.BOTTOM) {
            this.offsetY = this.canvas.height
        }
    }
    //设置数字
    setNum(num) {
        this.text = num.toString()
        this._init()
    }
    //描绘
    draw(ctx) {
        ctx.save()
        if (this.alpha != 1) {
            ctx.globalAlpha = this.alpha
        }
        let posX = this.position.x - this.offsetX
        let posY = this.position.y - this.offsetY
        if (this.angle || this.scale.x !== 1 || this.scale.y !== 1) {
            ctx.translate(posX + this.canvas.width / 2, posY + this.canvas.height / 2)
            ctx.rotate(this.angle)
            ctx.scale(this.scale.x, this.scale.y)
            ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2)
            ctx.drawImage(this.canvas, 0, 0)
        } else {
            ctx.drawImage(this.canvas, posX, posY)
        }

        ctx.restore()
    }
}