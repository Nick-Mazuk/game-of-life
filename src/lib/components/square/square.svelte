<script lang="ts">
    import { SQUARE_SIZE } from '$lib/constants'

    import type { SquareType } from '$lib/types'

    export let type: SquareType

    const TYPE_MAP: Record<SquareType, string> = {
        dead: 'bg-transparent',
        primary: 'bg-primary border-transparent',
        success: 'bg-success border-transparent',
    }

</script>

<div
    class="rounded border {TYPE_MAP[type]}"
    style="{`width: ${SQUARE_SIZE}; height: ${SQUARE_SIZE}`}"
></div>
