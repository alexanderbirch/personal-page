<script lang="ts">
    import Ship from "$lib/Game/Ship.svelte";
    import { goto } from "$app/navigation";
    import Obstacle from "$lib/Game/Obstacle.svelte";
    import { GameStatus, type GameData } from "$lib/Game/Game";
    import { blur } from "svelte/transition";
    import { cubicIn } from "svelte/easing";
    import { validateName } from "$lib/Validation/validation";

    let data: GameData;

    let gameStatus: GameStatus = GameStatus.Pending;

    let introended = false,
        outroended = false;

    let introstep = 0;
    let name = "";

    let validate_error = false;

    const startGame = async (e: SubmitEvent) => {
        try {
            const formData = new FormData(e.target as HTMLFormElement);

            const response = await fetch("/demo/play/init", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                data = await response.json();
                gameStatus = GameStatus.Running;
            } else {
                validate_error = true;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validate = () => {
        try {
            validateName(name);

            return true;
        } catch (error) {
            validate_error = true;
        }

        return false;
    };

    const collision = async () => {
        try {
            const response = await fetch(`/demo/play/status/${data.id}`);
            gameStatus = (await response.json()).status;
        } catch (error) {
            console.log(error);
        }
    };

    const destroy = async (id: string) => {
        try {
            const response = await fetch(`/demo/play/destroy/${data.id}/${id}`);
            const json = await response.json();
            if (json.destroyed) data = json.data;
            gameStatus = json.status;
        } catch (error) {
            console.log(error);
        }
    };

    $: x =
        gameStatus == GameStatus.Won && outroended
            ? goto(`/demo/result/${data.id}`)
            : null;

    const overlayCancel = (e: MouseEvent) => {
        const target = <HTMLElement>e.target;

        if (target.id === "overlay") {
            goto("/portfolio");
        }
    };
</script>

<svelte:head><title>SpaceA - Alexander Birch</title></svelte:head>

<h1>SpaceA</h1>

{#if gameStatus == GameStatus.Pending && introended}
    <div
        id="overlay"
        on:click={overlayCancel}
        in:blur={{ duration: 500, easing: cubicIn }}
        out:blur={{ duration: 200, easing: cubicIn }}
    >
        <div>
            <form method="post" on:submit|preventDefault={startGame}>
                <input type="hidden" name="name" value={name} />
                {#if introstep === 0}
                    <h2>Welcome, recruit!</h2>
                    <p>
                        <label for="name" class:validate_error>
                            Tell me your name:
                        </label>
                    </p>
                    <p>
                        <input
                            type="text"
                            id="name"
                            autocomplete="off"
                            bind:value={name}
                        />
                    </p>
                    <div>
                        <button
                            on:click={() => {
                                if (validate()) introstep++;
                            }}>Next</button
                        >
                    </div>
                {:else}
                    <h2>Attention, {name}!</h2>
                    <p>We have detected several incoming space rocks.</p>
                    <p>
                        If we are to have any hope of surviving, you must zap
                        the rocks before they hit the ship!
                    </p>
                    <p>Are you up for the job, {name}?</p>
                    <div>
                        <button on:click={() => (introstep = 0)}> Back </button>
                        <button type="submit">Ready</button>
                    </div>
                {/if}
            </form>
        </div>
    </div>
{/if}

<div class="game-container">
    <Ship bind:introended bind:outroended {gameStatus} />

    {#if data}
        {#each data.obstacles as obstacle}
            <Obstacle
                {gameStatus}
                time={obstacle.time}
                destroyed={obstacle.destroyed}
                on:collision={() => collision()}
                on:destroy={() => destroy(obstacle.id)}
            />
        {/each}
    {/if}
</div>

{#if gameStatus == GameStatus.Lost}
    <div
        id="overlay"
        on:click={overlayCancel}
        in:blur={{ duration: 500, easing: cubicIn }}
        out:blur={{ duration: 200, easing: cubicIn }}
    >
        <div>
            <h2>Game lost!</h2>
            <p>Better luck next time, {name}.</p>
            <button
                on:click={() => {
                    gameStatus = GameStatus.Pending;
                    introstep = 1;
                    data.obstacles = [];
                }}>Retry</button
            >
        </div>
    </div>
{/if}

<style>
    .validate_error {
        color: var(--second);
    }

    #overlay {
        position: fixed;
        top: var(--nav-height);
        left: 0;
        display: grid;
        grid-template-columns: auto 20vw auto;
        grid-template-rows: 25vh min-content auto;
        width: 100vw;
        height: calc(100vh - var(--nav-height));
        background-color: var(--white50);
        z-index: 10;
    }

    @media only screen and (max-width: 1500px) {
        #overlay {
            grid-template-columns: auto 60vw auto;
        }
    }

    @media only screen and (max-width: 500px) {
        #overlay {
            grid-template-columns: auto 90vw auto;
        }
    }

    #overlay > div {
        grid-row: 2;
        grid-column: 2;
        padding: 2rem;
        border-radius: 0.6rem;
        border: 0.5rem solid var(--first);
        background: var(--bg);
    }

    .game-container {
        width: 100%;
        overflow: hidden;
    }
</style>
