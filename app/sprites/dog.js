import Sprite from '../../prime/sprite'
import Adapter from '../../prime/adapter'

export default class Dog extends Sprite {
    health = 100
    //是否正在咬萝卜车，这是时钟
    beat = 0
    //这种狗狗晕后的得分
    score = 0
    //狗狗能够承受的攻击
    bear = 10
    constructor(...args) {
        super(...args)
        //添加跑动动画
        this.addAnimation('run', [0, 1, 2, 3], 100)
        //添加停住动画
        this.addAnimation('stop', [4, 5], 100)
        //添加晕倒动画
        this.addAnimation('sleep', [6, 7], 100)
        //添加后退动画
        this.addAnimation('back', [8, 9, 10, 11], 100)
        this.setCurrentAnim('run')
    }
}