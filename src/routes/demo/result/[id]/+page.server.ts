import type { PageServerLoad } from './$types';
import { db, fromGameData } from "$lib/Game/db";
import { GameController } from "$lib/Game/Game";

export const load: PageServerLoad = async function ({ params }) {
    const id = params.id;

    let r = db.data?.find(r => { return r.id == id }) || null;

    if (!r) {
        let game = GameController.getController().get(id)

        if (!game) {
            return {
                status: 400,
                errors: { notFound: `Not found: /demo/result/${id}` }
            }
        }

        r = fromGameData(game.data);
        db.data?.push(r);
        db.write();
    }

    return { result: { ...r } }
}