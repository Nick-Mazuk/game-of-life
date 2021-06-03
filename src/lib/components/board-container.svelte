<script lang="ts">
    import { browser } from '$app/env'

    import LoadingSpinner from '@nick-mazuk/ui-svelte/src/elements/loading-spinner/loading-spinner.svelte'

    import { BOARD_HEIGHT, BOARD_WIDTH } from '$lib/constants'
    import { board } from '$lib/stores/board'
    import Square from '$lib/components/square.svelte'
</script>

{#if browser}
    <div
        class="grid gap-0.5"
        style="{`grid-template-columns: repeat(${BOARD_WIDTH}, 1fr); grid-template-rows: repeat(${BOARD_HEIGHT}, 1fr);`}"
    >
        {#each $board.squares as row}
            {#each row as square}
                <Square type="{square}" />
            {/each}
        {/each}
    </div>
{:else}
    <div class="aspect-w-3 aspect-h-2 relative">
        <div class="absolute inset-0 flex items-center justify-around">
            <LoadingSpinner />
        </div>
    </div>
{/if}
