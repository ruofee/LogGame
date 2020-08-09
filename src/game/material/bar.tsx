export const createBar = (score: number, width: number): string => {
    let bar: string = ''
    const title: string = '  score:'
    const _width: number = width - String(score).length - title.length
    for (let i = 0; i < _width; i++) {
        bar += ' '
    }
    bar += `${title}${score}`;
    return bar
}
