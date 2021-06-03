<script lang="ts">
    import type { SquareType } from '$lib/types'

    export let type: SquareType

    const TYPE_MAP: Record<SquareType, string> = {
        dead: 'border',
        primary: 'bg-primary',
        success: 'bg-success',
    }
</script>

<div class="relative aspect-w-1 aspect-h-1">
    <div class="absolute inset-0 rounded-sm {TYPE_MAP[type]}"></div>
</div>
