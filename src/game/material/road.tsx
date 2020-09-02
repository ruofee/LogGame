export interface RoadConfig {
    width: number,
    height: number,
    roadNum: number // 道路数量
}

export const roadConfig: RoadConfig = {
    width: 8,
    height: 30,
    roadNum: 3
}

export interface FenceConfig {
    left?: string,
    right?: string,
    content?: string,
    width: number,
    height: number
}

export class Fence {
    defaultFence: string
    fenceConfig: FenceConfig
    constructor(fenceConfig: FenceConfig) {
        this.defaultFence = '|'
        this.fenceConfig = fenceConfig
    }
    getFence(material: string = this.defaultFence, height: number): string {
        let fenceRight: string = ''
        for (let i = 0; i < height; i++) {
            if (i !== 0 && i !== height) {
                fenceRight += '\n'
            }
            fenceRight += material
        }
        return fenceRight
    }
    getFenceRight(): string {
        const {right, height} = this.fenceConfig
        return this.getFence(right, height)
    }
    getContent(): string {
        const {content, height} = this.fenceConfig
        console.log(content)
        return this.getFence(content, height)
    }
    getFenceLeft(): string {
        const {left, height} = this.fenceConfig
        return this.getFence(left, height)
    }
}
