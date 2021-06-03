<script lang="ts">
    import { onDestroy } from 'svelte'

    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'
    import Button from '@nick-mazuk/ui-svelte/src/elements/button/button.svelte'
    import Play from '@nick-mazuk/ui-svelte/src/elements/icon/play.svelte'
    import Pause from '@nick-mazuk/ui-svelte/src/elements/icon/pause.svelte'
    import ChevronRight from '@nick-mazuk/ui-svelte/src/elements/icon/chevron-right.svelte'

    import BoardContainer from '$lib/components/board-container.svelte'
    import { board } from '$lib/stores/board'

    let interval: NodeJS.Timeout | undefined
    $: isEvolving = typeof interval !== 'undefined'

    const startEvolving = () => {
        isEvolving = true
        interval = setInterval(() => {
            board.evolve()
        }, 250)
    }

    const stopEvolving = () => {
        if (interval) clearInterval(interval)
        isEvolving = false
        interval = undefined
    }

    const handleEvolvingClick = () => {
        if (isEvolving) stopEvolving()
        else startEvolving()
    }

    onDestroy(() => {
        if (interval) clearInterval(interval)
    })

</script>

<Seo title="" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<main class="wrapper my-8 flex flex-col space-y-8">
    <BoardContainer />
    <div class="flex items-center">
        <p class="w-full">Generation: {$board.generation}</p>
        <div class="flex-none flex items-center space-x-4">
            <Button
                size="small"
                on:click="{handleEvolvingClick}"
                prefix="{isEvolving ? Pause : Play}"
            >
                Evolve
            </Button>
            <Button
                size="small"
                on:click="{() => board.evolve()}"
                suffix="{ChevronRight}"
                variant="secondary"
                disabled="{isEvolving}"
            >
                Next generation
            </Button>
        </div>
        <div class="w-full flex justify-end">
            <Button
                size="small"
                on:click="{() => board.reset()}"
                variant="secondary"
                disabled="{isEvolving}"
            >
                Reset
            </Button>
        </div>
    </div>
</main>
