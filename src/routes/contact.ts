import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async function ({ request }) {
    /*
    * Start new game
    */
    try {
        return {
            status: 200,
            body: { yes: "yes" }
        }

    } catch (error) {
        return {
            status: 400,
            error
        }
    }
}
