"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBookingsIndex = exports.MILLISEC_PER_DAY = void 0;
exports.MILLISEC_PER_DAY = 86400000;
function resolveBookingsIndex(bookingsIndex, checkInDate, checkOutDate) {
    let dateCursor = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const newBookingsIndex = Object.assign({}, bookingsIndex);
    while (dateCursor <= checkOut) {
        const y = dateCursor.getUTCFullYear();
        const m = dateCursor.getUTCMonth();
        const d = dateCursor.getUTCDate();
        if (!newBookingsIndex[y])
            newBookingsIndex[y] = {};
        if (!newBookingsIndex[y][m])
            newBookingsIndex[y][m] = {};
        if (!newBookingsIndex[y][m][d]) {
            newBookingsIndex[y][m][d] = true;
        }
        else {
            throw new Error("selected dates can't overlap dates that have already been booked");
        }
        dateCursor = new Date(dateCursor.getTime() + exports.MILLISEC_PER_DAY);
    }
    return newBookingsIndex;
}
exports.resolveBookingsIndex = resolveBookingsIndex;
