"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenant = exports.listing = exports.id = void 0;
function id(booking) {
    return booking._id.toString();
}
exports.id = id;
function listing(booking, _args, { db }) {
    return db.listings.findOne({ _id: booking.listing });
}
exports.listing = listing;
function tenant(booking, _args, { db }) {
    return db.users.findOne({ _id: booking.tenant });
}
exports.tenant = tenant;
