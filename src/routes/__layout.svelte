<script>
    import ResetItems from '$lib/components/reset-items.svelte'
    import Header from '@nick-mazuk/ui-svelte/src/components/header/header.svelte'
    import HeaderBrand from '@nick-mazuk/ui-svelte/src/components/header/header-brand/header-brand.svelte'
    import HeaderItemWrapper from '@nick-mazuk/ui-svelte/src/components/header/header-item-wrapper/header-item-wrapper.svelte'
    import DarkModeSelect from '@nick-mazuk/ui-svelte/src/elements/dark-mode-select/dark-mode-select.svelte'
    import Button from '@nick-mazuk/ui-svelte/src/elements/button/button.svelte'
    import { darkMode } from '$lib/stores/dark-mode'
    import { board } from '$lib/stores/board'

</script>

<ResetItems />

<Header fullWidth>
    <svelte:fragment slot="left">
        <HeaderBrand text="Game of life" />
        <HeaderItemWrapper>
            <p>Generation: {$board.generation}</p>
        </HeaderItemWrapper>
    </svelte:fragment>
    <svelte:fragment slot="right">
        <HeaderItemWrapper>
            <Button size="small" on:click="{() => board.evolve()}">Evolve</Button>
        </HeaderItemWrapper>
        <HeaderItemWrapper>
            <Button size="small" on:click="{() => board.reset()}">Reset</Button>
        </HeaderItemWrapper>
        <HeaderItemWrapper>
            <DarkModeSelect store="{darkMode}" size="small" />
        </HeaderItemWrapper>
    </svelte:fragment>
</Header>

<slot />
