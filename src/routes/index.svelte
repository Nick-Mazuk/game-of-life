<script lang="ts">
    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'
    import Button from '@nick-mazuk/ui-svelte/src/elements/button/button.svelte'
    import Play from '@nick-mazuk/ui-svelte/src/elements/icon/play.svelte'
    import Pause from '@nick-mazuk/ui-svelte/src/elements/icon/pause.svelte'
    import ChevronRight from '@nick-mazuk/ui-svelte/src/elements/icon/chevron-right.svelte'
    import Select from '@nick-mazuk/ui-svelte/src/form/inputs/select/select.svelte'

    import BoardContainer from '$lib/components/board-container.svelte'
    import { board } from '$lib/stores/board'

    let interval = 250
    let isEvolving = false

    const timeoutFunction = () => {
        if (!isEvolving) return
        board.evolve()
        setTimeout(() => {
            timeoutFunction()
        }, interval)
    }

    const startEvolving = () => {
        isEvolving = true
        timeoutFunction()
    }

    const stopEvolving = () => {
        isEvolving = false
    }

    const handleEvolvingClick = () => {
        if (isEvolving) stopEvolving()
        else startEvolving()
    }

    const handleSpeedChange = (event: CustomEvent<number>) => {
        interval = event.detail
    }

</script>

<Seo title="" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<main class="wrapper my-8 flex flex-col space-y-8">
    <BoardContainer />
    <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
        <div class="w-full flex justify-center md:justify-start">
            <div class="w-48">
                <Select ariaLabel="Playback speed" on:change="{handleSpeedChange}">
                    <option value="{500}">Slow</option>
                    <option value="{250}" selected>Normal speed</option>
                    <option value="{100}">Fast</option>
                </Select>
            </div>
        </div>
        <div class="flex-none flex items-center space-x-4">
            <Button on:click="{handleEvolvingClick}" prefix="{isEvolving ? Pause : Play}">
                Evolve
            </Button>
            <Button
                on:click="{() => board.evolve()}"
                suffix="{ChevronRight}"
                variant="secondary"
                disabled="{isEvolving}"
            >
                Next generation
            </Button>
        </div>
        <div class="w-full flex justify-center md:justify-end">
            <Button on:click="{() => board.reset()}" variant="secondary" disabled="{isEvolving}">
                Reset
            </Button>
        </div>
    </div>
</main>
