<script lang="ts">
    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'
    import Button from '@nick-mazuk/ui-svelte/src/elements/button/button.svelte'
    import Play from '@nick-mazuk/ui-svelte/src/elements/icon/play.svelte'
    import Pause from '@nick-mazuk/ui-svelte/src/elements/icon/pause.svelte'
    import ChevronRight from '@nick-mazuk/ui-svelte/src/elements/icon/chevron-right.svelte'
    import Select from '@nick-mazuk/ui-svelte/src/form/inputs/select/select.svelte'

    import BoardContainer from '$lib/components/board-container.svelte'
    import { board } from '$lib/stores/board'
    import { evolutionSpeed } from '$lib/stores/evolution-speed'
    import type { EvolutionSpeed } from '$lib/types'

    const SPEED_MAP: Record<EvolutionSpeed, number> = {
        slow: 500,
        default: 250,
        fast: 100,
    }

    let isEvolving = false

    const timeoutFunction = () => {
        if (!isEvolving) return
        board.evolve()
        setTimeout(() => {
            timeoutFunction()
        }, SPEED_MAP[$evolutionSpeed])
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

    const handleSpeedChange = (event: CustomEvent<EvolutionSpeed>) => {
        evolutionSpeed.set(event.detail)
    }
</script>

<Seo title="" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<main id="main-content">
    <h1 class="sr-only">Game of life</h1>
    <div class="wrapper my-8 flex flex-col space-y-8">
        <BoardContainer />
        <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
            <div class="w-full flex justify-center md:justify-start">
                <div class="w-48">
                    <Select
                        ariaLabel="Evolution speed"
                        defaultValue="{$evolutionSpeed}"
                        on:change="{handleSpeedChange}"
                    >
                        <option value="slow">Slow</option>
                        <option value="default" selected>Normal speed</option>
                        <option value="fast">Fast</option>
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
                <Button
                    on:click="{() => board.reset()}"
                    variant="secondary"
                    disabled="{isEvolving}"
                >
                    Reset
                </Button>
            </div>
        </div>
    </div>
</main>
