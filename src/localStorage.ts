export const saveState = (name: string, state: number) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(name, serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = (name: string) => {
    try {
        const serializedState = localStorage.getItem(name);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};