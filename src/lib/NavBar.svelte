<script>
    import { page } from "$app/stores";

    const main_pages = [
        { routeUrl: "/", name: "About" },
        { routeUrl: "/portfolio", name: "Portfolio" },
    ];

    const socials = [
        {
            routeUrl: "https://linkedin.com/in/alexisbirch",
            name: "LinkedIn",
            logo: "/LI-In-Bug.png",
        },
        {
            routeUrl: "https://github.com/alexanderbirch",
            name: "GitHub",
            logo: "/GitHub-Mark-32px.png",
        },
    ];

    let innerWidth = 0;

    let socials_menu_visible = false;
</script>

<div class="logo"><a href="/"><img alt="A" src="/a-red.svg" /></a></div>

<!-- Main pages -->
<ul class="main-pages">
    {#each main_pages as { routeUrl, name }}
        <li>
            <a href={routeUrl} class:active={$page.url.pathname === routeUrl}
                >{name}</a
            >
        </li>
    {/each}
</ul>

<!-- Socials -->
<ul class="socials">
    {#each socials as { routeUrl, name, logo }}
        <li><a href={routeUrl}><img alt={name} src={logo} /></a></li>
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

    @media only screen and (max-width: 400px) {
        .logo img {
            padding: 1rem 1rem 0.5rem 1rem;
        }
    }

    ul {
        list-style: none;
    }

    li {
        display: inline-block;
    }

    ul a {
        display: block;
        text-align: center;
        padding: 1rem;
        font-size: 1rem;
    }

    ul img {
        margin-top: 4px;
        height: 1.5rem;
        filter: grayscale(0.5);
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
