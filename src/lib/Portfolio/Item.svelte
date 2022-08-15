<script lang="ts">
    export let url: string, title: string, header: string, img: string;
</script>

<article>
    <header>
        <a class="title" href={url}><h2>{title}</h2></a>
    </header>

    <a class="img" href={url}>
        <img src={img} alt={title} />
    </a>

    <div>
        <h3>
            {header}
        </h3>
        <slot name="main" />
    </div>
    {#if $$slots.about}
        <div class="about">
            <h3>About</h3>
            <slot name="about" />
        </div>
    {/if}
</article>

<style>
    article {
        display: grid;
        grid-template-columns: min-content auto;
        grid-auto-rows: min-content;
        grid-gap: 1.5rem;
    }

    header {
        grid-column: 1 / -1;
        color: inherit;
    }

    .img {
        grid-row: span 2;
        width: 15rem;
        margin-right: 2rem;
    }

    @media only screen and (max-width: 600px) {
        .img {
            width: 10rem;
            margin-right: 1rem;
        }
    }

    @media only screen and (max-width: 450px) {
        article {
            grid-template-columns: auto;
        }
    }

    img {
        width: 80%;
        transition: 400ms ease-in-out;
        filter: grayscale(0.6);
    }

    .img:hover img {
        filter: grayscale(0);
    }

    .about {
        margin-top: 1rem;
    }
</style>
