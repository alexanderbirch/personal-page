import type { RequestHandler } from "@sveltejs/kit";
import { GameController } from "$lib/Game/Game"

export const GET: RequestHandler = async function (event) {
    /*
    * Start new game
    */

    const gamectrl = GameController.getController()
    const id = event.params.id;
    const game = gamectrl.get(id)

    if (!game)
        return {
            status: 404,
            error: new Error(`Not found: /demo/status/alive/${id}`)
        };


    return {
        body: { status: game.status() }
    }
}