import type { RequestHandler } from "@sveltejs/kit";
import { GameController } from "$lib/Game/Game"

export const POST: RequestHandler = async function ({ request }) {
    /*
    * Start new game
    */

    const name = (await request.formData()).get("name")

    if (typeof name != "string" || !name.trim())
        return {
            status: 400,
            error: new Error(`Invalid game name: ${name}`)
        }

    const game = GameController.getController().newGame(name.trim());

    return {
        body: { ...game.data }
    };
}