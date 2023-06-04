import { create } from "zustand";
type State = {
    players: boolean[],
    setAlive: (index: number, isAlive: boolean) => void,
}

export const usePlayerStore = create<State>(set => ({
    players: Array(12).fill(true),
    setAlive: (index, isAlive) => set(state => {
        const newPlayers = [...state.players];
        newPlayers[index] = isAlive;
        return { players: newPlayers };
    }),
}));