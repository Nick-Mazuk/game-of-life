<script lang="ts">
    import { browser } from '$app/env'

    import LoadingSpinner from '@nick-mazuk/ui-svelte/src/elements/loading-spinner/loading-spinner.svelte'
    import { colorsHexMap } from '@nick-mazuk/ui-config/lib/colors.ts'

    import { BOARD_HEIGHT, BOARD_WIDTH } from '$lib/constants'
    import { board } from '$lib/stores/board'
    import type { Board, SquareType } from '$lib/types'

    type Context = CanvasRenderingContext2D | null | undefined

    let canvas: HTMLCanvasElement | undefined
    let canvasWidth: number | undefined
    let canvasHeight: number | undefined
    $: context = canvas?.getContext('2d')

    const clearCanvas = (context: CanvasRenderingContext2D) => {
        if (!canvas) return
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const drawSquare = (x: number, y: number, width: number, height: number, type: SquareType) => {
        if (!context || !canvas || type === 'dead') return
        if (type === 'primary') {
            context.fillStyle = colorsHexMap.primary
        } else {
            context.fillStyle = colorsHexMap.success
        }
        context.beginPath()
        context.rect(x, y, width, height)
        context.closePath()

        context.fill()
    }

    const drawBoard = (context: Context, board: Board) => {
        if (!context || !canvas || !canvasWidth || !canvasHeight) return
        const { squares } = board
        const squareWidth = canvasWidth / BOARD_WIDTH
        const squareHeight = canvasHeight / BOARD_HEIGHT
        clearCanvas(context)
        for (let i = 0; i < squares.length; i++) {
            for (let j = 0; j < squares[i].length; j++) {
                drawSquare(
                    i * squareWidth,
                    j * squareHeight,
                    squareWidth,
                    squareHeight,
                    squares[i][j]
                )
            }
        }
    }

    $: if (!resized && context) {
        context.scale(devicePixelRatio, devicePixelRatio)
        console.log('resized')
        resized = true
    }
    $: drawBoard(context, $board)
    $: devicePixelRatio = typeof window === 'undefined' ? 1 : window.devicePixelRatio
    $: if (canvas && canvasHeight && canvasWidth) {
        canvas.width = canvasWidth * devicePixelRatio
        canvas.height = canvasHeight * devicePixelRatio
    }
    let resized = false

</script>

<div class="aspect-w-3 aspect-h-2 relative">
    {#if browser}
        <canvas
            bind:this="{canvas}"
            bind:clientWidth="{canvasWidth}"
            bind:clientHeight="{canvasHeight}"
            class="absolute inset-0"></canvas>
    {:else}
        <div class="absolute inset-0 flex items-center justify-around">
            <LoadingSpinner />
        </div>
    {/if}
</div>
