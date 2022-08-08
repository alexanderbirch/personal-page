<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { GameStatus } from "$lib/Game/Game";
    export let time: number;

    export let gameStatus: GameStatus = GameStatus.Pending;

    export let destroyed = 0;
    let visible = false;

    let spinTime = 3000 + Math.random() * 2000;
    if (time - spinTime < 3000) spinTime = 3000;

    setTimeout(() => (visible = true), time - spinTime);

    const y = 30 * (Math.random() - 0.5);
    const dr = 360 * (1 + Math.random()) * (-1 + 2 * Math.round(Math.random()));

    const spin = (Node: Element, duration: number) => {
        return {
            duration,
            css: (t: number) => {
                return `transform: rotate(${t * dr}deg);
                        left: ${100 - t * (100 - 38)}vw;
                        top: calc(46vh + ${(1 - t) * y}vw);`;
            },
        };
    };

    const destroy = (Node: Element, duration: number) => {
        return {
            duration,
            css: (t: number) => {
                return `transform: scale(${t});`;
            },
        };
    };

    const dispatch = createEventDispatcher();
</script>

{#if visible && gameStatus == GameStatus.Running}
    {#if !destroyed}
        <div
            style:top={y}
            in:spin={spinTime}
            out:destroy={100}
            on:mousedown={() => {
                dispatch("destroy");
            }}
            on:introend={() => {
                dispatch("collision");
            }}
        >
            <img alt="Rock" src="/rock.svg" />
        </div>
    {/if}
{/if}

<style>
    div {
        position: absolute;
        left: 38vw;
        top: 46vh;
        width: 8rem;
        padding: 1rem;
    }

    img {
        width: 100%;
    }
</style>
