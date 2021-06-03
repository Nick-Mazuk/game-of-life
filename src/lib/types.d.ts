export type SquareType = 'primary' | 'success' | 'dead'
export type Board = {
    squares: SquareType[][]
    generation: number
}
export type EvolutionSpeed = 'fast' | 'default' | 'slow'
