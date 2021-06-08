<script lang="ts">
    import { browser } from '$app/env'

    import LoadingSpinner from '@nick-mazuk/ui-svelte/src/elements/loading-spinner/loading-spinner.svelte'

    import { BOARD_HEIGHT, BOARD_WIDTH } from '$lib/constants'
    import { board } from '$lib/stores/board'
    import type { SquareType } from '$lib/types'

    let canvas: HTMLCanvasElement | undefined
    let canvasWidth: number | undefined
    let canvasHeight: number | undefined
    $: context = canvas?.getContext('2d')
    $: primaryColor = canvas ? getComputedStyle(canvas).getPropertyValue('--c-primary') : ''
    $: successColor = canvas ? getComputedStyle(canvas).getPropertyValue('--c-success') : ''

    const clearCanvas = () => {
        if (!canvas || !context) return
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const drawSquare = (x: number, y: number, width: number, height: number, type: SquareType) => {
        if (!context || !canvas || type === 'dead') return
        if (type === 'primary') context.fillStyle = `rgb(${primaryColor})`
        else context.fillStyle = `rgb(${successColor})`

        context.beginPath()
        context.rect(x, y, width, height)
        context.closePath()

        context.fill()
    }

    const drawBoard = () => {
        if (!context || !canvas || !canvasWidth || !canvasHeight || !primaryColor) return
        const { squares } = $board
        const squareWidth = canvasWidth / BOARD_WIDTH
        const squareHeight = canvasHeight / BOARD_HEIGHT
        clearCanvas()
        for (const [row, rowSquares] of squares.entries()) {
            for (const [col, square] of rowSquares.entries())
                drawSquare(row * squareWidth, col * squareHeight, squareWidth, squareHeight, square)
        }
    }

    $: if (!resized && context) {
        context.scale(devicePixelRatio, devicePixelRatio)
        resized = true
    }
    $: if (context && $board) drawBoard()
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
