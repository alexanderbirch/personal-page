<script>
    import Item from "$lib/portfolio/Item.svelte";
</script>

<svelte:head><title>Portfolio - Alexander Birch</title></svelte:head>

<h1>Portfolio</h1>

<Item title="SpaceA" header="Demo project" url="/demo" img="/a-red.svg ">
    <div slot="main">
        <p>Save the A-ship from certain doom and become the hero of SpaceA.</p>
        <p>
            Help navigate the ship by keeping the path clear of incoming space
            rocks.
        </p>
    </div>

    <div slot="about">
        <p>
            SpaceA is a demo game built using
            <a href="https://kit.svelte.dev/">SvelteKit</a>.
        </p>
        <p>
            Animations are built in <a href="https://svelte.dev/">Svelte</a> on top
            of basic HTML using dynamic CSS for animations.
        </p>
        <p>
            The game is run through a REST API in the SvelteKit server (Vite).
        </p>
        <p>Game data is stored in Google Firestore.</p>
    </div>
</Item>
