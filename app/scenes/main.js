import Scene from '../../prime/scene'
import Sprite from '../../prime/sprite'
import Vector2 from '../../prime/vector2'
import Text from '../../prime/ui/text'
import Adapter from '../../prime/adapter'
import Background from '../sprites/background'
import Num from '../sprites/num'
import Carrot from '../sprites/carrot'
import Dog from '../sprites/dog'
import Dog1 from '../sprites/dog1'
import Dog2 from '../sprites/dog2'
import Dog3 from '../sprites/dog3'
import Stone from '../sprites/stone'
import Stick from '../sprites/stick'
import Bone from '../sprites/bone'

import resources from '../resources'

const TOOL_TYPE = {
    None: 0,
    Stone: 1,
    Bone: 2,
    Stick: 3
}
export default class MainScene extends Scene {
    constructor(game) {
        super(game)
        this.game = game
        // 游戏进行中
        this.running = true
        // 游戏速度
        this.speedH = 120
        // 远景
        this.bg1 = this.addGameObject(new Background(0, 0, 1, {
            texture: resources.bg1,
            speed: new Vector2(this.speedH, 0),
            distance: 2,
            repeatH: true,
            stageWidth: game.stageWidth,
            stageHeight: game.stageHeight
        }))
        // 近景
        this.bg2 = this.addGameObject(new Background(0, 0, 2, {
            texture: resources.bg2,
            speed: new Vector2(this.speedH, 0),
            distance: 1,
            repeatH: true,
            stageWidth: game.stageWidth,
            stageHeight: game.stageHeight
        }))
        //头像背景
        this.headBg = this.addGameObject(new Sprite(20, 20, 3, {
            texture: resources.headBg,
            fixed: 'top-left'
        }))
        //头像
        this.head = this.addGameObject(new Sprite(22, 10, 4, {
            texture: resources.head,
            fixed: 'top-left'
        }))
        //道具背景
        this.toolBg = []
        for (var i = 0; i < 3; i++) {
            this.toolBg[i] = this.addGameObject(new Sprite(120 + 70 * i, 20, 3, {
                texture: resources.toolBg,
                fixed: 'top-left'
            }))
        }
        //石头
        this.stoneTool = this.addGameObject(new Sprite(120, 30, 4, {
            type: TOOL_TYPE.Stone,
            texture: resources.stone,
            count: 100,
            cd: 1000,
            fixed: 'top-left'
        }))
        //石头数目
        this.stoneNum = this.addGameObject(new Num(190, 100, 5, {
            text: '*' + this.stoneTool.count.toString(),
            texture: resources.smallNum,
            align: Text.ALIGN.RIGHT,
            valign: Text.VALIGN.BOTTOM,
            fixed: 'top-left'
        }))
        //木棍
        this.stickTool = this.addGameObject(new Sprite(190, 30, 4, {
            type: TOOL_TYPE.Stick,
            texture: resources.stick,
            count: 30,
            cd: 1000,
            fixed: 'top-left'
        }))
        //木棍数目
        this.stickNum = this.addGameObject(new Num(260, 100, 5, {
            text: '*' + this.stickTool.count.toString(),
            texture: resources.smallNum,
            align: Text.ALIGN.RIGHT,
            valign: Text.VALIGN.BOTTOM,
            fixed: 'top-left'
        }))
        //骨头
        this.boneTool = this.addGameObject(new Sprite(260, 30, 4, {
            type: TOOL_TYPE.Bone,
            texture: resources.bone,
            count: 30,
            cd: 1000,
            fixed: 'top-left'
        }))
        //骨头数目
        this.boneNum = this.addGameObject(new Num(330, 100, 5, {
            text: '*' + this.boneTool.count.toString(),
            texture: resources.smallNum,
            align: Text.ALIGN.RIGHT,
            valign: Text.VALIGN.BOTTOM,
            fixed: 'top-left'
        }))
        //血条背景
        this.bloodBg = this.addGameObject(new Sprite(500, 30, 3, {
            texture: resources.bloodBg,
            fixed: 'top-left'
        }))
        //血条
        this.blood = this.addGameObject(new Sprite(510, 45, 4, {
            texture: resources.blood,
            fixed: 'top-left'
        }))
        //菜单按钮
        this.menuButton = this.addGameObject(new Sprite(0, -100, 3, {
            texture: resources.menuButton,
            fixed: 'bottom-left'
        }))
        //暂停按钮
        this.stopButton = this.addGameObject(new Sprite(100, -100, 3, {
            texture: resources.stopButton,
            fixed: 'bottom-left'
        }))
        //游戏分数
        this.sumScore = 0
        //显示分数背景
        this.scoreBg = this.addGameObject(new Sprite(900, -110, 3, {
            texture: resources.scoreBg,
            fixed: 'bottom-left'
        }))
        //分数
        this.score = this.addGameObject(new Num(1050, -100, 4, {
            text: this.sumScore.toString(),
            texture: resources.bigNum,
            fixed: 'bottom-left'
        }))
        //萝卜车
        this.carrot = this.addGameObject(new Carrot(-50, 400, 5, {
            health: 100,
            //是否被咬
            isBeated: false,
            //能够承受被咬的次数
            bear: 10,
            fixed: 'top-left'
        }))
        //狗狗
        this.dogs = []
        //当前使用道具
        this.currentTool = TOOL_TYPE.Stone
        //当前已经走过长度
        this.currentLength = 0
        //目标长度
        this.targetLength = 8000

        //成功过关画面
        this.success = null
        //过关失败画面
        this.fail = null
        this.on('tap', e => {
            switch (e.target) {
                // 点击暂停、开始
                case this.stopButton:
                    if (this.running) {
                        this.trigger('pause')
                        this.running = false
                    } else {
                        this.trigger('resume')
                        this.running = true
                    }
                    break;
                    // 点击菜单
                case this.menuButton:
                    this.trigger('switchScene', 'Menu')
                    break;
                    // 点击成功或者失败画面重新开始
                case this.success || this.fail:
                    this.trigger('switchScene', 'Menu')
                    break;
                    // 点击石头切换道具
                case this.stoneTool:
                    if (this.running) {
                        this.currentTool = TOOL_TYPE.Stone
                    }
                    break;
                    // 点击木棍切换道具
                case this.stickTool:
                    if (this.running) {
                        this.currentTool = TOOL_TYPE.Stick
                    }
                    break;
                    // 点击骨头切换道具
                case this.boneTool:
                    if (this.running) {
                        this.currentTool = TOOL_TYPE.Bone
                    }
                    break;
                default:
                    if (this.running) {
                        var o = e.target
                        // 点击狗狗，丢东西赶走狗狗
                        if (o instanceof Dog && o.currentAnimation == o.animations.run) {
                            switch (this.currentTool) {
                                case TOOL_TYPE.Stone:
                                    this.throwStone(e.x, e.y, o.z)
                                    break
                                case TOOL_TYPE.Stick:
                                    this.throwStick(o);
                                    break
                                case TOOL_TYPE.Bone:
                                    this.throwBone(e.x, e.y, o.z)
                                    break
                                default:
                                    break
                            }
                        }
                    }
                    break
            }
        })
        // 失败则出现失败画面
        this.on('fail', () => {
            this.fail = this.addGameObject(new Sprite(128, 0, 6, {
                texture: resources.fail,
                fixed: 'top-left'
            }))
        })
        // 成功则出现成功画面
        this.on('success', () => {
            this.success = this.addGameObject(new Sprite(128, 0, 6, {
                texture: resources.success,
                fixed: 'top-left'
            }))
        })
    }
    update(dt) {
        // 增加过关长度
        this.currentLength += this.bg2.speed.x * dt
        this.judgeStatus()
        // 如果已经成功过关或者游戏失败，则停止游戏
        if (this.success || this.fail) {
            this.trigger('pause')
            return
        }
        // 默认胡萝卜没有被咬
        this.carrot.isBeated = false
        this.dogs.forEach(dog => {
            // 如果晕倒了或者后退了，则移出屏幕则当消失了
            if (dog.currentAnimation == dog.animations.sleep || dog.currentAnimation == dog.animations.back) {
                if (dog.position.x > this.game.renderStageZone.right) {
                    dog.kill()
                }
            }
            // 判断每只狗狗，如果在咬胡萝卜，则胡萝卜被咬
            if (dog.collideWith(this.carrot)) {
                if (dog.currentAnimation == dog.animations.run) {
                    this.carrot.isBeated = true
                    if (!dog.beat) {
                        dog.speed.set(0, 0)
                        dog.beat = Adapter.setInterval(() => {
                            //扣除萝卜1点血量
                            if (this.carrot && this.carrot.health > 0) {
                                this.carrot.health -= (100 / this.carrot.bear)
                            } else {
                                this.clearCarrotBeat(dog)
                            }
                        }, 1000)
                    }
                }
            } else {
                this.clearCarrotBeat(dog)
            }
        })
        this.dogs = this.dogs.filter(dog => !dog.died)
        this.addDog(dt)
        //改变血条的宽度
        this.blood.texture.sizeWidth = 240 * this.carrot.health / 100
        super.update(dt)
    }
    judgeStatus() {
        // 如果胡萝卜已经没有血了，则游戏失败
        if (this.carrot.health <= 0) {
            this.trigger('fail')
            return
        }
        // 如果过关长度已经达到指定的关卡长度，则过关
        if (this.currentLength >= this.targetLength) {
            this.trigger('success')
            return
        }
    }
    addDog(dt) {
        // 随机出现狗狗
        let r = Math.random()
        let dog
        if (r < 0.3 * dt) {
            if (r < 0.1 * dt) {
                dog = this.addGameObject(new Dog1(0, 500, 5, {
                    health: 100,
                    speed: new Vector2(-this.speedH, 0),
                    texture: resources.dog1,
                    fixed: 'top-right'
                }))
            } else {
                if (r < 0.2 * dt) {
                    dog = this.addGameObject(new Dog2(0, 500, 5, {
                        health: 100,
                        speed: new Vector2(-this.speedH, 0),
                        texture: resources.dog2,
                        fixed: 'top-right'
                    }))
                } else {
                    dog = this.addGameObject(new Dog3(0, 450, 5, {
                        health: 100,
                        speed: new Vector2(-this.speedH, 0),
                        texture: resources.dog3,
                        fixed: 'top-right'
                    }))
                }
            }
            this.dogs.push(dog)
        }
    }
    clearCarrotBeat(dog) {
        if (dog.beat) {
            Adapter.clearInterval(dog.beat)
            dog.beat = 0
        }
    }
    beatDog(dog) {
        this.clearCarrotBeat(dog)
        dog.health -= (100 / dog.bear)
        if (dog.health <= 0) {
            dog.setCurrentAnim('sleep')
            this.sumScore += dog.score
            this.score.setNum(this.sumScore.toString())
            dog.speed.x = this.speedH
        } else {
            dog.setCurrentAnim('stop', 2, () => {
                dog.setCurrentAnim('run')
                dog.speed.x = -this.speedH
            })
            dog.speed.x = this.speedH
        }
    }
    checkStoneCollide(stone) {
        for (let dog of this.dogs) {
            if (stone.collideWith(dog) && dog.currentAnimation == dog.animations.run) {
                stone.kill()
                this.beatDog(dog)
                break
            }
        }
        if (stone.position.y > this.game.renderStageZone.bottom - 120) {
            stone.kill()
        }
    }
    checkBoneCollide(bone) {
        for (let dog of this.dogs) {
            if (bone.collideWith(dog) && dog.currentAnimation == dog.animations.run) {
                bone.kill()
                this.clearCarrotBeat(dog)
                dog.setCurrentAnim('back')
                dog.speed.set(2 * this.speedH, 0)
                break
            }
        }
        if (bone.position.y > this.game.renderStageZone.bottom - 120) {
            bone.kill()
        }
    }
    throwStone(x, y, z) {
        if (this.stoneTool.count) {
            var stone = new Stone(this.carrot.position.x + this.carrot.texture.sizeWidth, this.carrot.position.y, z)
            stone.setTarget(x, y)
            stone.on('checkCollide', () => {
                this.checkStoneCollide(stone)
            })
            this.addGameObject(stone)
            this.stoneTool.count--
            this.stoneNum.setNum('*' + this.stoneTool.count.toString())
        }
    }
    throwStick(dog) {
        if (this.stickTool.count) {
            var stick = new Stick(this.carrot.position.x + this.carrot.texture.sizeWidth, this.carrot.position.y, dog.z)
            this.beatDog(dog)
            dog.position.x += 150
            this.addGameObject(stick)
            this.stickTool.count--
            this.stickNum.setNum('*' + this.stickTool.count.toString())
        }
    }
    throwBone(x, y, z) {
        if (this.boneTool.count) {
            var bone = new Bone(this.carrot.position.x + this.carrot.texture.sizeWidth, this.carrot.position.y, z)
            bone.setTarget(x, y)
            bone.on('checkCollide', this.checkBoneCollide.bind(this))
            this.addGameObject(bone)
            this.boneTool.count--
            this.boneNum.setNum('*' + this.boneTool.count.toString())
        }
    }
}