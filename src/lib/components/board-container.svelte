<script lang="ts">
    import { BOARD_HEIGHT, BOARD_WIDTH, SQUARE_SIZE } from '$lib/constants'
    import { board } from '$lib/stores/board'
    import Square from '$lib/components/square/square.svelte'

</script>

<div
    class="grid gap-1"
    style="{`grid-template-columns: repeat(${BOARD_WIDTH}, ${SQUARE_SIZE}); grid-template-rows: repeat(${BOARD_HEIGHT}, ${SQUARE_SIZE})`}"
>
    {#each $board.squares as row}
        {#each row as square}
            <Square type="{square}" />
        {/each}
    {/each}
</div>
