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
exports.bookings = exports.bookingsIndex = exports.host = exports.id = void 0;
function id(listing) {
    return listing._id.toString();
}
exports.id = id;
function host(listing, _args, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        const host = yield db.users.findOne({ _id: listing.host });
        if (!host)
            throw new Error("host can't be found");
        return host;
    });
}
exports.host = host;
function bookingsIndex(listing) {
    return JSON.stringify(listing.bookingsIndex);
}
exports.bookingsIndex = bookingsIndex;
function bookings(listing, { limit, page }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!listing.authorized)
                return null;
            const cursor = yield db.bookings
                .find({ _id: { $in: listing.bookings } })
                .skip(page > 0 ? (page - 1) * limit : 0)
                .limit(limit);
            return {
                total: yield cursor.count(),
                result: yield cursor.toArray(),
            };
        }
        catch (error) {
            throw new Error(`Failed to query listing bookings: ${error}`);
        }
    });
}
exports.bookings = bookings;
