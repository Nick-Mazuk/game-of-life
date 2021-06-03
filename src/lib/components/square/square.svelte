<script lang="ts">
    import { SQUARE_SIZE } from '$lib/constants'

    import type { SquareType } from '$lib/types'
    import SquareContents from './square-contents.svelte'

    export let type: SquareType

</script>

<div class="rounded border" style="{`width: ${SQUARE_SIZE}; height: ${SQUARE_SIZE}`}">
    {#if type !== 'dead'}
        <SquareContents type="{type}" />
    {/if}
</div>
