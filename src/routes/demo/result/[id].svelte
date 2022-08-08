<script lang="ts">
    import type { GameResult } from "$lib/Game/db";

    // populated with data from the endpoint
    export let result: GameResult;
</script>

<h1>GameWon</h1>
<p>{JSON.stringify(result)}</p>
