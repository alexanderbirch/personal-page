import type { PageServerLoad } from './$types';
import { dbLoad, dbSave, type GameResult } from "$lib/Game/db";
import { GameController } from "$lib/Game/Game";

export const load: PageServerLoad = async function ({ params }) {
    const id = params.id;

    let r = await dbLoad(id);

    if (!r) {
        let game = GameController.getController().get(id)

        if (!game) {
            return {
                status: 400,
                errors: { notFound: `Not found: /demo/result/${id}` }
            }
        }

        r = dbSave(game.data);
    }

    return { ...r };
}