<script lang="ts">
    import { onMount } from "svelte";

    export let from = 0,
        to = 0;

    if (to < from) throw new Error("Count 'to' must be greater than 'from'");

    let visible = false;

    const count = (node: Element, { speed = 1 }) => {
        const duration = (Math.log(to - from) * 200) / speed;
        const leadingZerosBase = ~~Math.log10(to);

        return {
            duration,
            tick: (t: number) => {
                const x = from + ~~((to - from) * Math.sqrt(t));
                const leadingZeros = leadingZerosBase - ~~Math.log10(x);
                node.textContent = "0".repeat(leadingZeros) + x.toString();
            },
        };
    };

    onMount(() => (visible = true));
</script>

{#if visible}
    <span in:count>{to}</span>
{/if}
