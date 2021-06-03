<script lang="ts">
    import { fade, scale } from 'svelte/transition'
    import { TRANSITION_SPEED_MAP } from '@nick-mazuk/ui-svelte/src/configs/transitions'
    import { SQUARE_SIZE } from '$lib/constants'

    type ContentType = 'primary' | 'success'

    export let type: ContentType

    const TYPE_MAP: Record<ContentType, string> = {
        primary: 'bg-primary',
        success: 'bg-success',
    }

</script>

<div
    class="rounded {TYPE_MAP[type]}"
    style="{`width: ${SQUARE_SIZE}; height: ${SQUARE_SIZE}`}"
    in:scale="{{ duration: TRANSITION_SPEED_MAP.large.in, start: 0.8 }}"
    out:fade="{{ duration: TRANSITION_SPEED_MAP.large.out }}"
></div>
