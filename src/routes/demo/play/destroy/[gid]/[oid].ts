import type { RequestHandler } from "@sveltejs/kit";
import { GameController } from "$lib/Game/Game"

export const GET: RequestHandler = async function (event) {
    /*
    * Start new game
    */

    const gamectrl = GameController.getController()
    const gid = event.params.gid;
    const oid = event.params.oid;
    const game = gamectrl.get(gid);

    if (!game)
        return {
            status: 404,
            error: new Error(`Not found: /demo/play/destroy/${gid}/${oid}`)
        };

    const destroyed = game.destroy(oid);

    return {
        body: { destroyed, status: game.status(), data: { ...game.data } }
    }
}