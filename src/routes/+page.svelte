<svelte:head><title>Alexander Birch - PhD CS & Eng.</title></svelte:head>

<h1>About</h1>

<article>
    <h2>Introduction</h2>
    <div class="grid">
        <div>
            <p>
                In February 2022 I obtained the
                <a
                    href="https://orbit.dtu.dk/en/projects/logical-foundations-of-al-algorithms"
                >
                    PhD in Computer Science and Engineering
                </a>
                degree at DTU (Technical University of Denmark). I worked on topics
                in AI, agent programming, formal verification and logic.
            </p>
            <p>
                <a href="/thesis-ab.pdf">My thesis</a> formalizes a verification
                framework for agents in the GOAL programming language in the Isabelle/HOL
                proof assistant.
            </p>

            <p>
                From February 2017 to December 2018, I was a software developer
                at PDC A/S. I worked on microservices consumed by a mobile/web
                frontend, features to the native staff planning application,
                database infrastructure (as code) and more.
            </p>
            <p>
                As an engineer, I have a deep foundational understanding of
                software development and computational logic. My experience
                includes software design and architecture, prototyping,
                demonstrating reliablity of software (proof and test), complex
                algorithms.
            </p>
        </div>
        <div>
            <img alt="Portrait" src="/portrait.jpg" />
        </div>
    </div>
</article>

<article>
    <h2>Contact</h2>
    <p>
        For business inquiries and relevant job openings, please contact me on <a
            href="https://linkedin.com/in/alexisbirch">LinkedIn</a
        >.
    </p>
    <p>
        My list of publications is available on
        <a href="https://dblp.org/pid/166/1639.html">dblp</a>
        and I have a
        <a href="https://people.compute.dtu.dk/aleje/">personal DTU page</a>.
    </p>
    <p />
</article>

<article>
    <h2>This site</h2>
    <p>
        I have built this site using
        <a href="https://kit.svelte.dev">SvelteKit</a>.
    </p>
    <p>
        The source code is freely available at
        <a href="https://github.com/alexanderbirch">GitHub</a>.
    </p>
</article>

<style>
    .grid {
        display: grid;
        grid-template-columns: auto min-content;
        gap: 2rem;
    }

    img {
        width: 9rem;
    }

    @media only screen and (max-width: 600px) {
        .grid {
            grid-template-columns: auto;
        }
    }
</style>
