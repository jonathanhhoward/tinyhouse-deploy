"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingResolvers = void 0;
const Mutaion_1 = require("./Mutaion");
const Booking_1 = require("./Booking");
exports.bookingResolvers = {
    Mutation: {
        createBooking: Mutaion_1.createBooking,
    },
    Booking: {
        id: Booking_1.id,
        listing: Booking_1.listing,
        tenant: Booking_1.tenant,
    },
};
