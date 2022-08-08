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
        width: auto;
    }

    .content {
        grid-template-columns: 1fr 1fr;
        grid-gap: 1em;
        min-height: calc(100vh - var(nav-height));
        padding: 5rem 2rem;
        max-width: var(--main-width);
        margin: 0 auto;
    }
</style>
