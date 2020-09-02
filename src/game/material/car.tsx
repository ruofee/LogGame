export interface CarConfig {
    width: number,
    height: number,
    x: number,
    y: number,
    acceleratesSpeed: number,
    speed: number
}

export const carConfig: CarConfig = {
    width: 4,
    height: 3,
    x: 3,
    y: 27,
    acceleratesSpeed: 2,
    speed: 2
}

export const fire = `
*  *
 **
*  *
`;

const car = `
0--0
 II
0TT0
`

export default car
