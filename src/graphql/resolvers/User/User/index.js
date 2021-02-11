"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listings = exports.bookings = exports.income = exports.hasWallet = exports.id = void 0;
function id(user) {
    return user._id;
}
exports.id = id;
function hasWallet(user) {
    return Boolean(user.walletId);
}
exports.hasWallet = hasWallet;
function income(user) {
    return user.authorized ? user.income : null;
}
exports.income = income;
function bookings(user, { limit, page }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.authorized)
                return null;
            const cursor = yield db.bookings
                .find({ _id: { $in: user.bookings } })
                .skip(page > 0 ? (page - 1) * limit : 0)
                .limit(limit);
            return {
                total: yield cursor.count(),
                result: yield cursor.toArray(),
            };
        }
        catch (error) {
            throw new Error(`Failed to query user bookings: ${error}`);
        }
    });
}
exports.bookings = bookings;
function listings(user, { limit, page }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cursor = yield db.listings
                .find({ _id: { $in: user.listings } })
                .skip(page > 0 ? (page - 1) * limit : 0)
                .limit(limit);
            return {
                total: yield cursor.count(),
                result: yield cursor.toArray(),
            };
        }
        catch (error) {
            throw new Error(`Failed to query user listings: ${error}`);
        }
    });
}
exports.listings = listings;
