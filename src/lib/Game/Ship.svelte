<script lang="ts">
    import { fly, scale } from "svelte/transition";
    import { tweened } from "svelte/motion";
    import { quadInOut } from "svelte/easing";
    import { onMount } from "svelte";
    import { GameStatus } from "$lib/Game/Game";

    export let gameStatus: GameStatus = GameStatus.Pending;

    let innerWidth = 0;

    let visible = false;

    export let introended = false,
        outroended = false;

    const sy = tweened(40, {
        duration: 1000,
        easing: quadInOut,
    });

    const hovery = async () => {
        await sy.set(41);
        await sy.set(39);
        hovery();
    };

    const customOut = (Node: Element, _x: any) => {
        return gameStatus == GameStatus.Won
            ? fly(Node, { y: -innerWidth / 1.8, duration: 2000 })
            : scale(Node, { duration: 500 });
    };

    onMount(async () => {
        visible = true;
    });
</script>

<svelte:window bind:innerWidth />

{#if visible && (gameStatus == GameStatus.Running || gameStatus == GameStatus.Pending)}
    <img
        src="/a-red.svg"
        alt="A"
        style:top="{$sy}vh"
        in:fly={{ y: innerWidth / 2, duration: 3000 }}
        out:customOut|local={{}}
        on:introend={() => {
            introended = true;
            hovery();
        }}
        on:outroend={() => {
            outroended = true;
        }}
    />
{/if}

<style>
    img {
        transform: rotate(90deg);
        width: 10vw;
        position: absolute;
        left: 30vw;
        top: 40vh;
    }
</style>
