<script lang="ts">
    import type { SquareType } from '$lib/types'

    export let type: SquareType

    const TYPE_MAP: Record<SquareType, string> = {
        dead: 'border',
        primary: 'bg-primary',
        success: 'bg-success',
    }

</script>

<div class="rounded {TYPE_MAP[type]}"></div>
