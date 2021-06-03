<script lang="ts">
    import LoadingSpinner from '@nick-mazuk/ui-svelte/src/elements/loading-spinner/loading-spinner.svelte'

    import { BOARD_HEIGHT, BOARD_WIDTH } from '$lib/constants'
    import { board } from '$lib/stores/board'
    import Square from '$lib/components/square.svelte'

    let boardSize = 0
    $: gap = boardSize / BOARD_WIDTH < 12 ? 1 : 4
    $: squareSize = (boardSize - (BOARD_WIDTH - 1) * gap) / BOARD_WIDTH

</script>

<div bind:clientWidth="{boardSize}">
    {#if boardSize}
        <div
            class="grid"
            style="{`grid-template-columns: repeat(${BOARD_WIDTH}, ${squareSize}px); grid-template-rows: repeat(${BOARD_HEIGHT}, ${squareSize}px); gap: ${gap}px`}"
        >
            {#each $board.squares as row}
                {#each row as square}
                    <Square type="{square}" />
                {/each}
            {/each}
        </div>
    {/if}
</div>
{#if !boardSize}
    <div class="aspect-w-3 aspect-h-2 relative">
        <div class="absolute inset-0 flex items-center justify-around">
            <LoadingSpinner />
        </div>
    </div>
{/if}
