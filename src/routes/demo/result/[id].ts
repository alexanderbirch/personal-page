import type { RequestHandler } from "@sveltejs/kit";
import { db, fromGameData } from "$lib/Game/db";
import { GameController } from "$lib/Game/Game";

export const GET: RequestHandler = async function ({ params }) {
    const id = params.id;

    let r = db.data?.find(r => { return r.id == id }) || null;

    if (!r) {
        let game = GameController.getController().get(id)

        if (!game) {
            return {
                status: 400,
                error: new Error(`Not found: /demo/result/${id}`)
            }
        }

        r = fromGameData(game.data);
        db.data?.push(r);
        db.write();
    }

    return {
        body: { result: { ...r } }
    }
}