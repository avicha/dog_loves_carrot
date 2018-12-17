import Sprite from '../../prime/sprite'
import resources from '../resources'

export default class Enter extends Sprite {
    constructor(...args) {
        super(...args)
        // 鼠标移出的图案
        this.addAnimation('mouseout', [0], 100)
        // 鼠标移入的图案
        this.addAnimation('mousein', [1], 100)
        this.setCurrentAnim('mouseout')
    }
}