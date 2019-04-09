import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Loader from '../../prime/loader'
import Schedule from '../sprites/schedule'
import resources from '../resources'

export default class LoadingScene extends Scene {
    static getResources() {
        return [resources.loadingBg, resources.schedule]
    }
    constructor(game) {
        super(game)
        // 加载背景图片
        this.loading_bg = this.addGameObject(new Sprite(0, 0, 1, {
            texture: resources.loadingBg
        }))
        // 加载进度条
        this.schedule = this.addGameObject(new Schedule(490, 562, 2))
        let loader = new Loader()
        // 加载游戏所需所有资源
        loader.addResources(Object.values(resources))
        // 更新加载进度
        loader.on('progressUpdate', (progress) => {
            this.schedule.setProgress(progress)
        })
        // 加载完成跳到菜单页面
        loader.on('progressComplete', () => {
            this.trigger('switchScene', 'Menu')
        })
        loader.load()
    }
}