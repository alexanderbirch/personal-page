<script>
    import NavBar from "$lib/NavBar.svelte";
</script>

<div class="grid-container">
    <NavBar />
</div>

<div class="content">
    <slot />
</div>

<style>
    .grid-container {
        display: grid;
        grid-template-columns: 40vw auto 40vw;
        width: 100vw;
    }

    .content {
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
        min-height: calc(100vh - var(nav-height));
        padding: 5rem 2rem;
        max-width: var(--main-width);
        margin: 0 auto;
    }

    @media only screen and (max-width: 800px) {
        .grid-container {
            grid-template-columns: min-content min-content auto;
        }

        .content {
            padding: 2rem 2rem;
        }
    }
</style>
