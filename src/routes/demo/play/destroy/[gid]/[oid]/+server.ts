import { json } from '@sveltejs/kit';
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
        return json({ status: 404 });

    const destroyed = game.destroy(oid);

    return json({ destroyed, status: game.status(), data: { ...game.data } })
}