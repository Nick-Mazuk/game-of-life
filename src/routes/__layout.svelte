<script lang="ts">
    import { browser } from '$app/env'

    import Header from '@nick-mazuk/ui-svelte/src/components/header/header.svelte'
    import HeaderBrand from '@nick-mazuk/ui-svelte/src/components/header/header-brand/header-brand.svelte'
    import HeaderItemWrapper from '@nick-mazuk/ui-svelte/src/components/header/header-item-wrapper/header-item-wrapper.svelte'
    import HeaderLink from '@nick-mazuk/ui-svelte/src/components/header/header-link/header-link.svelte'
    import DarkModeSelect from '@nick-mazuk/ui-svelte/src/elements/dark-mode-select/dark-mode-select.svelte'
    import Github from '@nick-mazuk/ui-svelte/src/elements/icon/github.svelte'
    import Footer from '@nick-mazuk/ui-svelte/src/components/footer/footer.svelte'
    import FooterSocialLinkWrapper from '@nick-mazuk/ui-svelte/src/components/footer/footer-social-link-wrapper/footer-social-link-wrapper.svelte'
    import FooterSocialLink from '@nick-mazuk/ui-svelte/src/components/footer/footer-social-link/footer-social-link.svelte'

    import ResetItems from '$lib/components/reset-items.svelte'
    import { darkMode } from '$lib/stores/dark-mode'
    import { board } from '$lib/stores/board'

    const githubRepoUrl = 'https://github.com/Nick-Mazuk/game-of-life'
</script>

<ResetItems />

<Header sticky>
    <svelte:fragment slot="left">
        <HeaderBrand text="Game of life" />
    </svelte:fragment>
    <svelte:fragment slot="center">
        <HeaderItemWrapper breakpoint="none">
            <p data-test="generation">Generation: {browser ? $board.generation : '--'}</p>
        </HeaderItemWrapper>
    </svelte:fragment>

    <svelte:fragment slot="right">
        <HeaderLink href="{githubRepoUrl}" breakpoint="none">
            <Github title="Github" size="{6}" />
        </HeaderLink>
    </svelte:fragment>
</Header>

<slot />

<Footer>
    <svelte:fragment slot="subfooter">
        <p>©{new Date().getFullYear()} Nick Mazuk.</p>
        <FooterSocialLinkWrapper>
            <FooterSocialLink href="{githubRepoUrl}" title="Github">
                <Github />
            </FooterSocialLink>
        </FooterSocialLinkWrapper>
        <DarkModeSelect store="{darkMode}" />
    </svelte:fragment>
</Footer>
