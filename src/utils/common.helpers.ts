export const ObjectEx = {
    isNullOrEmpty(obj: object | null | undefined) {
        return !obj || Object.keys(obj).length === 0;
    },

    clone<T>(obj: T): T {
        return structuredClone(obj);
    },

    pick<T, K extends keyof T>(obj: T, keys: K[]) {
        return Object.fromEntries(
            keys.map(k => [k, obj[k]])
        ) as Pick<T, K>;
    },

    omit<T, K extends keyof T>(obj: T, keys: K[]) {
        return Object.fromEntries(
            Object.entries(obj as any).filter(([k]) => !keys.includes(k as K))
        ) as Omit<T, K>;
    }
};