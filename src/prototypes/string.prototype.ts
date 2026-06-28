declare global {
    interface String {
        isNullOrWhiteSpace(): boolean;
        capitalize(): string;
        titleCase(): string;
        truncate(length: number, suffix?: string): string;
        toSlug(): string;
        toNumber(): number;
        toBoolean(): boolean;
        reverse(): string;
    }
}

String.prototype.isNullOrWhiteSpace = function () {
    return this.trim().length === 0;
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleCase = function () {
    return this.toLowerCase()
        .split(" ")
        .map(x => x.capitalize())
        .join(" ");
};

String.prototype.truncate = function (length, suffix = "...") {
    return this.length > length
        ? this.substring(0, length) + suffix
        : this.toString();
};

String.prototype.toSlug = function () {
    return this.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
};

String.prototype.toNumber = function () {
    return Number(this);
};

String.prototype.toBoolean = function () {
    return this.toLowerCase() === "true";
};

String.prototype.reverse = function () {
    return [...this].reverse().join("");
};

export {}