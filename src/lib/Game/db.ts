import { Low, JSONFile } from 'lowdb'
import type { GameData } from './Game';

export interface GameResult { id: string; start: number, name: string; score: number }

export function fromGameData(data: GameData): GameResult {
    let score = 0;

    data.obstacles.forEach(o => score += o.time - (o.destroyed || 0));

    return { id: data.id, name: data.name, score, start: data.start };
}


const adapter = new JSONFile<GameResult[]>("db.json");

export const db = new Low<GameResult[]>(adapter);

await db.read()
db.data ||= []