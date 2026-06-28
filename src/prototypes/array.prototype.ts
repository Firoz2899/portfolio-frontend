declare global {
    interface Array<T> {
        compact(): NonNullable<T>[];
        joinTruthy(separator?: string): string;
        distinct<K>(selector?: (item: T) => K): T[];
        firstOrNull(): T | null;
        lastOrNull(): T | null;
        isNullOrEmpty(): boolean;
        chunk(size: number): T[][];
        groupBy<K extends PropertyKey>(selector: (item: T) => K): Record<K, T[]>;
    }
}

Array.prototype.compact = function () {
    return this.filter(Boolean);
};

Array.prototype.joinTruthy = function (separator = ", ") {
    return this.filter(Boolean).join(separator);
};

Array.prototype.firstOrNull = function () {
    return this.length ? this[0] : null;
};

Array.prototype.lastOrNull = function () {
    return this.length ? this[this.length - 1] : null;
};

Array.prototype.isNullOrEmpty = function () {
    return this.length === 0;
};

Array.prototype.chunk = function (size) {
    const result = [];

    for (let i = 0; i < this.length; i += size)
        result.push(this.slice(i, i + size));

    return result;
};

Array.prototype.distinct = function (selector) {
    if (!selector)
        return [...new Set(this)];

    const map = new Map();

    for (const item of this) {
        const key = selector(item);
        if (!map.has(key))
            map.set(key, item);
    }

    return [...map.values()];
};

Array.prototype.groupBy = function (selector) {
    return this.reduce((acc, item) => {
        const key = selector(item);
        (acc[key] ||= []).push(item);
        return acc;
    }, {});
};

export {}