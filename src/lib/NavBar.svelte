<script>
    import { page } from "$app/stores";

    const main_pages = [
        { routeUrl: "/about", name: "About" },
        { routeUrl: "/portfolio", name: "Portfolio" },
    ];

    const socials = [
        {
            routeUrl: "https://linkedin.com/in/alexisbirch",
            name: "LinkedIn",
            logo: "",
        },
        {
            routeUrl: "https://github.com/alexanderbirch",
            name: "GitHub",
            logo: "",
        },
    ];
</script>

<div class="logo"><a href="/"><img alt="A" src="/a-red.svg" /></a></div>

<!-- Main pages -->
<ul class="main-pages">
    {#each main_pages as { routeUrl, name }}
        <li>
            <a href={routeUrl} class:active={$page.url.href.includes(routeUrl)}
                >{name}</a
            >
        </li>
    {/each}
</ul>

<!-- Socials -->
<ul class="socials">
    {#each socials as { routeUrl, name }}
        <li><a href={routeUrl}>{name}</a></li>
    {/each}
</ul>

<div class="shadow" />

<style>
    .main-pages {
        grid-column: 2;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .socials {
        grid-column: 3;
        display: flex;
        align-items: center;
        justify-content: end;
        padding-right: 2rem;
    }

    .logo {
        grid-column: 1;
    }

    .logo img {
        height: calc(var(--nav-height) * 0.7);
        padding: 1rem 2rem 0.5rem 2rem;
    }

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
    }

    ul a {
        display: block;
        text-decoration: none;
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
        color: var(--text);
    }

    ul a:hover {
        text-decoration: underline;
        color: var(--flash);
    }

    .active {
        color: var(--second);
    }

    div.shadow {
        grid-column: 1 / span 3;
        height: 0.15rem;
        background: linear-gradient(var(--text), rgba(0, 0, 0, 0));
    }
</style>
