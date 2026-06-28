declare global {
    interface Date {
        addDays(days: number): Date;
        addMonths(months: number): Date;
        addYears(years: number): Date;
        isToday(): boolean;
        isPast(): boolean;
        isFuture(): boolean;
    }
}

Date.prototype.addDays = function (days) {
    const d = new Date(this);
    d.setDate(d.getDate() + days);
    return d;
};

Date.prototype.addMonths = function (months) {
    const d = new Date(this);
    d.setMonth(d.getMonth() + months);
    return d;
};

Date.prototype.addYears = function (years) {
    const d = new Date(this);
    d.setFullYear(d.getFullYear() + years);
    return d;
};

Date.prototype.isToday = function () {
    return this.toDateString() === new Date().toDateString();
};

Date.prototype.isPast = function () {
    return this < new Date();
};

Date.prototype.isFuture = function () {
    return this > new Date();
};

export {}