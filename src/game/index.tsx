import car, {carConfig, fire} from './material/car'
import Canvas from '../utils/canvas'
import {getRandom} from '../utils'
import {roadConfig, Fence} from './material/road'
import {createBar} from './material/bar'
import {stone, StoneConfig} from './material/block'

interface Config {
    width: number,
    height: number
}

interface Game {
    status: number, // 0: 菜单, 1: 开始, 2: 结束
    score: number,
    overTimer: number
}

export default class LogGame {
    canvasConfig: Config
    game: Game
    fence: Fence
    stoneConfig: StoneConfig
    carEvent?: any
    gameInterval: any
    constructor() {
        /**
         * 画布配置
         */
        this.canvasConfig = {
            width: 100,
            height: 30
        }
        /**
         * 游戏配置
         */
        this.game = {
            status: 0,
            overTimer: 5,
            score: 0
        }
        /**
         * 马路配置
         */
        this.fence = new Fence({
            left: '[',
            right: ']',
            width: 1,
            height: this.canvasConfig.height
        })
        /**
         * 障碍配置
         */
        this.stoneConfig = {
            width: 6,
            height: 3,
            x: 0,
            y: -3
        }
    }
    start(): void {
        const canvas: Canvas = new Canvas(this.canvasConfig.width, this.canvasConfig.height)
        const fenceRight: string = this.fence.getFenceRight()
        const fenceLeft: string = this.fence.getFenceLeft()
        const maxX: number = this.fence.fenceConfig.width * (roadConfig.roadNum + 1) + roadConfig.width * roadConfig.roadNum
        const minX: number = this.fence.fenceConfig.width

        this.stoneConfig.x = 2 + getRandom(0, 2) * (roadConfig.width + this.fence.fenceConfig.width)

        /**
         * 车子事件
         */
        this.carEvent = (event: KeyboardEvent) => {
            const code: number = event.keyCode
            switch (code) {
                case 40: {
                    const y: number = carConfig.y + carConfig.acceleratesSpeed
                    if (y > this.canvasConfig.height - carConfig.height) {
                        return
                    }
                    carConfig.y = y
                    break
                }
                case 39: {
                    const x: number = carConfig.x + roadConfig.width + this.fence.fenceConfig.width
                    if (x >= maxX) {
                        return
                    }
                    carConfig.x = x
                    break
                }
                case 38: {
                    const y: number = carConfig.y - carConfig.acceleratesSpeed
                    if (y < 0) {
                        return
                    }
                    carConfig.y = y
                    break
                }
                case 37: {
                    const x: number = carConfig.x - roadConfig.width - this.fence.fenceConfig.width
                    if (x < minX) {
                        return
                    }
                    carConfig.x = x
                    break
                }
            }
        }
        window.addEventListener('keydown', this.carEvent)
        
        this.gameInterval = setInterval(() => {
            console.clear()
            canvas.reload()
            /**
             * 是否展示游戏结束动画
             */
            if (this.game.overTimer === 0) {
                clearInterval(this.gameInterval)
                console.log('%cGAME OVER', 'color: red')
                console.log(`%cYour score is ${this.game.score}`, 'color: blue')
                const username: string | null = window.prompt('请输入你的名称')
                localStorage.setItem(`LOGGAME-${username || 'unknown'}`, String(this.game.score))
                return
            }
            /**
             * 碰撞检测
             */
            if (canvas.isCollision(carConfig, this.stoneConfig)) {
                // 如果发生碰撞则游戏结束
                this.game.status = 2
            }
            /**
             * 增加游戏难度
             */
            if (this.game.score >= 5) {
                carConfig.speed = 5;
            }
            else if (this.game.score >= 15) {
                carConfig.speed = 6;
            }
            else if (this.game.score >= 25) {
                carConfig.speed = 7;
            }
            else if (this.game.score >= 40) {
                carConfig.speed = 8;
            }
            else if (this.game.score >= 65) {
                carConfig.speed = 9;
            }
            /**
             * 添加马路素材
             */
            let roadX: number = 0
            for (let i: number = 0; i < roadConfig.roadNum + 1; i++) {
                const material: string = (i === roadConfig.roadNum) ? fenceRight : fenceLeft
                canvas.addMaterial(material, {
                    width: this.fence.fenceConfig.width,
                    height: this.fence.fenceConfig.height,
                    x: roadX + i * this.fence.fenceConfig.width + roadConfig.width * i,
                    y: 0
                })
            }
            /**
             * 添加car素材
             */
            if (!(this.game.status === 2)) {
                // 游戏未结束时渲染车子
                canvas.addMaterial(car, carConfig)
            }
            else {
                // 游戏结束时触发游戏结束倒计时
                canvas.addMaterial(fire, carConfig)
                window.removeEventListener('keydown', this.carEvent)
                this.game.overTimer--
            }
            /**
             * 添加障碍素材
             */
            canvas.addMaterial(stone, this.stoneConfig)
            this.stoneConfig.y += carConfig.speed
            if (this.stoneConfig.y - this.stoneConfig.height >= canvas.height) {
                this.stoneConfig.y = -3
                this.stoneConfig.x = 2 + getRandom(0, 2) * (roadConfig.width + this.fence.fenceConfig.width)
                if (!(this.game.status === 2)) {
                    this.game.score++
                }
            }
            /**
             * 顶部栏
             */
            const barWidth: number = this.fence.fenceConfig.width * 4 + roadConfig.width * 3;
            canvas.addMaterial(createBar(this.game.score, barWidth), {
                width: barWidth,
                height: 1,
                x: 0,
                y: 0
            })
            /**
             * 展示canvas
             */
            console.log(`%c${canvas.space}`, 'color: blue')
        }, 200)
    }
    stop(): void {
        clearInterval(this.gameInterval)
        window.removeEventListener('keydown', this.carEvent)
    }
}
