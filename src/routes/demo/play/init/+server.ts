import { json } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";
import { GameController } from "$lib/Game/Game"
import { validateName } from "$lib/Validation/validation";

export const POST: RequestHandler = async function ({ request }) {
    /*
    * Start new game
    */
    try {
        const name = validateName((await request.formData()).get("name"));

        const game = GameController.getController().newGame(name);

        return json({ ...game.data });
    } catch (error) {
        return json({ status: 403, error })
    }
}
