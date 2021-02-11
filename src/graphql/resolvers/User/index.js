"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolvers = void 0;
const Query_1 = require("./Query");
const User_1 = require("./User");
exports.userResolvers = {
    Query: {
        user: Query_1.user,
    },
    User: {
        id: User_1.id,
        hasWallet: User_1.hasWallet,
        income: User_1.income,
        bookings: User_1.bookings,
        listings: User_1.listings,
    },
};
