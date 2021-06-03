import { writable } from 'svelte/store'

import { BOARD_WIDTH, BOARD_HEIGHT, SQUARE_TYPE_ARRAY } from '$lib/constants'
import type { Board, SquareType } from '$lib/types'

const generateNewSquares = (): SquareType[][] => {
    const squares: SquareType[][] = []

    for (let rowCount = 0; rowCount < BOARD_WIDTH; rowCount++) {
        const row: SquareType[] = []

        for (let colCount = 0; colCount < BOARD_HEIGHT; colCount++)
            row.push(SQUARE_TYPE_ARRAY[Math.floor(Math.random() * SQUARE_TYPE_ARRAY.length)])

        squares.push(row)
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
                    squares: generateNewSquares(),
                }
            })
        },
    }
}

const board = createBoard()

export { board }
