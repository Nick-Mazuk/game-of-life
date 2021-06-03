export type SquareType = 'primary' | 'success' | 'dead'
export type Board = {
    squares: SquareType[][]
    generation: number
}
