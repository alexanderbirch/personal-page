import type { GameData } from './Game';
import { Firestore } from '@google-cloud/firestore';
import { LOCAL_MODE, API_KEY } from '$env/static/private';

export interface GameResult { id: string; start: number, name: string; score: number }

function fromGameData(data: GameData): GameResult {
    let score = 0;

    data.obstacles.forEach(o => score += o.time - (o.destroyed || 0));

    return { id: data.id, name: data.name, score: ~~score, start: data.start };
}

const db = LOCAL_MODE === "true" ? new Firestore({ keyFilename: API_KEY }) : new Firestore();

export const dbLoad = async (id: string) => {
    const snapshot = await db.collection('game-results').get();

    const entry = snapshot.docs.find(doc => doc.id == id);

    if (entry)
        return {
            id: entry.id,
            ...entry.data()
        };
}

export const dbSave = (data: GameData) => {
    const r = fromGameData(data);

    const docRef = db.collection('game-results').doc(r.id);

    docRef.set({
        start: r.start,
        name: r.name,
        score: r.score
    })

    return r;
}