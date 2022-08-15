export enum GameStatus { Pending = "p", Running = "r", Lost = "l", Won = "w" };

/* Game data */
export interface GameData {
    id: string,
    name: string;
    start: number,
    obstacles: { id: string; time: number; destroyed?: number }[]
}
export class Game {

    constructor(
        readonly data: GameData
    ) { };

    status() {
        if (!this.data.start) return GameStatus.Pending;
        if (!this.data.obstacles.some(o => !o.destroyed)) return GameStatus.Won;

        const time = new Date().getTime();
        if (time > this.data.start && time < this.data.start + Math.min(...this.data.obstacles.filter(o => { return !o.destroyed }).map(o => { return o.time })))
            return GameStatus.Running;

        return GameStatus.Lost;
    }

    destroy(id: string) {
        // Destroy
        if (this.status() !== GameStatus.Running) return false;
        const time = new Date().getTime();

        let r = false;

        this.data.obstacles = this.data.obstacles.map(o => {
            if (o.id == id)
                if (time < this.data.start + o.time) {
                    o.destroyed = time - this.data.start;
                    r = true;
                }

            return o;
        })

        return r;
    }
}

const N = 20; // Number of obstacles spawned
const interval = 3000; // initial interval (lessens every time)

export class GameController {
    private games: Game[] = [];
    protected static gamectrl = new this();

    newGame(name: string) {
        const start = new Date().getTime();

        // Spawn obstacles with unique ID and spawn randomly in interval
        let obstacles = [];
        let intervalNext = interval;
        let timeNext = interval;
        for (let i = 0; i < N; i++) {
            obstacles.push({ id: crypto.randomUUID(), time: timeNext });

            intervalNext -= interval / (N * 2);
            timeNext += intervalNext * (0.5 + Math.random() / 2)
        }

        const game = new Game({ id: crypto.randomUUID(), name, start, obstacles });

        this.clean();
        this.games.push(game);

        return game;
    }

    private clean() {
        /* Removes games that have timed out (removed elsewhere if they finish successfully) */
        const now = new Date().getTime();

        const maxTime = (N + 6) * interval; // grace period, just in case

        // Expensive but fix later
        this.games = this.games.filter((game) => { now > game.data.start + maxTime });
    }

    get(id: string) {
        return this.games.find(v => { return v.data.id == id }) || null;
    }

    static getController() {
        return this.gamectrl;
    }
}
