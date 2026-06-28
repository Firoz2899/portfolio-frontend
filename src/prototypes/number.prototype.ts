declare global {
    interface Number {
        formatCurrency(locale?: string, currency?: string): string;
        pad(length: number): string;
        between(min: number, max: number): boolean;
        round(decimal?: number): number;
        percentage(total: number): number;
    }
}

Number.prototype.formatCurrency = function (
    locale = "en-US",
    currency = "USD"
) {
    return this.toLocaleString(locale, {
        style: "currency",
        currency
    });
};

Number.prototype.pad = function (length) {
    return this.toString().padStart(length, "0");
};

Number.prototype.between = function (min, max) {
    return Number(this) >= min && Number(this) <= max;
};

Number.prototype.round = function (decimal = 2) {
    return Number(this.toFixed(decimal));
};

Number.prototype.percentage = function (total) {
    if (!total) return 0;
    return (Number(this) / total) * 100;
};

export {}