function changeStr(str: string, index: number, value: string): string {
    return str.substring(0, index) + value + str.substring(index + 1, str.length)
}

export interface MaterialConfig {
    width: number,
    height: number,
    x: number,
    y: number
}

export default class Canvas {
    width: number
    height: number
    space: string
    constructor(width: number = 150, height: number = 150) {
        this.width = width
        this.height = height
        this.space = ''
        this.reload()
    }
    reload(): void {
        this.space = ''
        for (let i: number = 0; i < this.height; i++) {
            let spaceItem: string = ''
            for (let j: number = 0; j < this.width; j++) {
                spaceItem += ' '
            }
            this.space += spaceItem
            if (i < this.width - 1 && i !== this.height - 1) {
                this.space += '\n'
            }
        }
    }
    addMaterial(material: string, materialConfig: MaterialConfig): boolean {
        const {width = 10, height = 10, x = 0, y = 0} = materialConfig
        const materialItems: Array<string> = material.split('\n').filter((item: string) => item.trim())
        const spaceItems: Array<string> = this.space.split('\n')
        let isExceed: boolean = false
        for (let index = 0; index < height; index++) {
            const _index = index + y
            if (_index >= 0) {
                // 若素材的y轴小于0则那部分不渲染
                if (_index > this.height - 1) {
                    // 若素材的高度超出, 则超出部分不渲染
                    isExceed = true
                    break
                }
                const materialItem: string = materialItems[index] || ''
                let spaceItem: string = spaceItems[_index]
                for (let i: number = 0; i < width; i++) {
                    if (x + i >= 0) {
                        // 若素材的x轴小于0则那部分不渲染
                        if (x + i > this.width) {
                            // 若素材的宽度超出, 则超出部分不渲染
                            isExceed = true
                            break
                        }
                        spaceItem = changeStr(spaceItem, x + i, materialItem[i] === undefined ? ' ' : materialItem[i])
                        spaceItems[_index] = spaceItem
                    }
                }
            }
        }
        this.space = spaceItems.join('\n')
        return isExceed
    }
    isCollision(a: MaterialConfig, b: MaterialConfig): boolean {
        // a 玩家 b障碍
        if (a.x + a.width < b.x || a.x > b.x + b.width || a.y + a.height < b.y || a.y > b.y + b.height) {
            return false
        }
        return true
    }
}
