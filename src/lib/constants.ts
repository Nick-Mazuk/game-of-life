import type { SquareType } from './types.d'

export const BOARD_WIDTH = 200
export const BOARD_HEIGHT = Math.round((BOARD_WIDTH / 3) * 2)

export const SQUARE_PROBABILITY: SquareType[] = ['dead', 'dead', 'dead', 'primary', 'success']
