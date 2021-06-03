import { writable } from 'svelte/store'

import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_PROBABILITY } from '$lib/constants'
import type { Board, SquareType } from '$lib/types'

const pickRandomSquare = (): SquareType => {
    return SQUARE_PROBABILITY[Math.floor(Math.random() * SQUARE_PROBABILITY.length)]
}

const generateNewSquares = (): SquareType[][] => {
    const squares: SquareType[][] = []

    for (let rowCount = 0; rowCount < BOARD_WIDTH; rowCount++) {
        const row: SquareType[] = []

        for (let colCount = 0; colCount < BOARD_HEIGHT; colCount++) row.push(pickRandomSquare())

        squares.push(row)
    }

    return squares
}

// this game is on a flat torus
const getNeighbors = (
    squares: SquareType[][],
    row: number,
    col: number
): { primaryNeighbors: number; successNeighbors: number } => {
    const previousRow = (row + BOARD_HEIGHT - 1) % BOARD_HEIGHT
    const nextRow = (row + 1) % BOARD_HEIGHT
    const previousColumn = (col + BOARD_WIDTH - 1) % BOARD_WIDTH
    const nextColumn = (col + 1) % BOARD_WIDTH

    const neighbors: SquareType[] = []
    neighbors.push(squares[previousRow][previousColumn])
    neighbors.push(squares[previousRow][col])
    neighbors.push(squares[previousRow][nextColumn])
    neighbors.push(squares[row][previousColumn])
    neighbors.push(squares[row][nextColumn])
    neighbors.push(squares[nextRow][previousColumn])
    neighbors.push(squares[nextRow][col])
    neighbors.push(squares[nextRow][nextColumn])

    let primaryNeighbors = 0
    let successNeighbors = 0

    neighbors.forEach((neighbor) => {
        if (neighbor === 'primary') primaryNeighbors++
        else if (neighbor === 'success') successNeighbors++
    })

    return { primaryNeighbors, successNeighbors }
}

const getNextValueIfDead = (primaryNeighbors: number, successNeighbors: number): SquareType => {
    if (primaryNeighbors >= 3 && successNeighbors <= 2) return 'primary'
    if (successNeighbors >= 3 && primaryNeighbors <= 2) return 'success'
    return 'dead'
}

const getSquareNextValue = (
    squares: SquareType[][],
    row: number,
    col: number,
    currentValue: SquareType
): SquareType => {
    const { primaryNeighbors, successNeighbors } = getNeighbors(squares, row, col)
    if (currentValue === 'dead') return getNextValueIfDead(primaryNeighbors, successNeighbors)
    const sameNeighbors = currentValue === 'primary' ? primaryNeighbors : successNeighbors
    const differentNeighbors = currentValue === 'primary' ? successNeighbors : primaryNeighbors
    const totalNeighbors = primaryNeighbors + successNeighbors
    if (totalNeighbors < 2 || totalNeighbors > 3) return 'dead'
    if (differentNeighbors > sameNeighbors) return 'dead'
    return currentValue
}

const evolve = (previous: SquareType[][]): SquareType[][] => {
    const squares: SquareType[][] = []
    for (const [row, rowElement] of previous.entries()) {
        const rowArray: SquareType[] = []

        for (const [col, square] of rowElement.entries())
            rowArray.push(getSquareNextValue(previous, row, col, square))

        squares.push(rowArray)
    }

    return squares
}

const createBoard = () => {
    const { subscribe, set, update } = writable<Board>({
        generation: 1,
        squares: generateNewSquares(),
    })

    return {
        subscribe,
        reset: () => {
            set({
                generation: 1,
                squares: generateNewSquares(),
            })
        },
        evolve: () => {
            update((previous) => {
                return {
                    generation: previous.generation + 1,
                    squares: evolve(previous.squares),
                }
            })
        },
    }
}

const board = createBoard()

export { board }
