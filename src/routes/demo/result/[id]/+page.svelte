<script lang="ts">
    import Count from "$lib/Effects/Count.svelte";

    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    // populated with data from the endpoint
    export let data: PageData;
    let { result } = data;

    let thisurl: string;
    onMount(() => {
        thisurl = window.location.href;
    });

    const date = new Date();
    date.setTime(result.start);
    const dateString = date.toISOString().replace(/T(\d+):(\d+).*/, " $1:$2");

    let copied = false;
</script>

<svelte:head><title>Result - SpaceA - Alexander Birch</title></svelte:head>

<h1>SpaceA</h1>

<article>
    <h2>
        <div class="grid">
            <div>Congratulations, {result.name}!</div>
            <div><nobr>{dateString}</nobr></div>
        </div>
    </h2>
    <div class="grid">
        <p class="score">Score: <Count to={result.score} /></p>
        <img src="/a-red.svg" alt="A" />
        <div>
            <h3>Share</h3>
            <p>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${thisurl}`}
                >
                    <button> LinkedIn </button>
                </a>
                <button
                    on:click={() => {
                        navigator.clipboard.writeText(thisurl);
                        copied = true;
                        setTimeout(() => (copied = false), 1000);
                    }}
                    class:copied
                >
                    Copy URL
                </button>
            </p>
        </div>
    </div>
</article>

<style>
    img {
        width: 10rem;
    }

    button {
        transition: 300ms ease-in-out;
    }

    button.copied {
        background-color: var(--flashgreen);
        border-color: var(--flashgreen);
    }

    .grid {
        display: grid;
        grid-template-columns: auto min-content;
    }

    .grid img {
        grid-row: span 2;
    }

    .score {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 5rem;
    }

    @media only screen and (max-width: 600px) {
        h2 .grid {
            display: grid;
            grid-template-columns: auto;
        }

        .grid img {
            grid-row: span 1;
        }

        button {
            margin-bottom: 0.5rem;
        }
    }
</style>
