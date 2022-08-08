<script lang="ts">
    import Ship from "$lib/Game/Ship.svelte";
    import { goto } from "$app/navigation";
    import Obstacle from "$lib/Game/Obstacle.svelte";
    import { GameStatus, type GameData } from "$lib/Game/Game";

    let data: GameData;

    let gameStatus: GameStatus = GameStatus.Pending;

    let introended = false,
        outroended = false;

    let validate_error = false;

    const startGame = async (e: SubmitEvent) => {
        validate_error = false;

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
                throw (validate_error = true);
            }
        } catch (error) {
            console.log(error);
        }
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
</script>

{#if gameStatus == GameStatus.Pending && introended}
    <form method="post" on:submit|preventDefault={startGame}>
        <div>
            <label for="name" class:validate_error>Name</label>
            <input type="text" id="name" name="name" />
        </div>
        <button type="submit">Ready</button>
    </form>
{/if}

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

{#if gameStatus == GameStatus.Lost}
    <h1>Game lost</h1>
    <p>Better luck next time!</p>
    <a href="/demo"><button>Try again?</button></a>
{/if}

<style>
    .validate_error {
        color: var(--second);
    }
</style>
