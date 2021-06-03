<script lang="ts">
    import Seo from '@nick-mazuk/ui-svelte/src/utilities/seo/seo.svelte'

    import BoardContainer from '$lib/components/board-container.svelte'

</script>

<Seo title="" siteName="{import.meta.env.VITE_PUBLIC_SITE_NAME}" />

<main>
    <BoardContainer />
</main>
