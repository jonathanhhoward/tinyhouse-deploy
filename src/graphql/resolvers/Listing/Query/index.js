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
exports.listings = exports.listing = void 0;
const mongodb_1 = require("mongodb");
const api_1 = require("../../../../lib/api");
const utils_1 = require("../../../../lib/utils");
const types_1 = require("../types");
const utils_2 = require("./utils");
function listing(_root, { id }, { db, req }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const listing = yield db.listings.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!listing)
                throw new Error("listing can't be found");
            const viewer = yield utils_1.authorize(db, req);
            if ((viewer === null || viewer === void 0 ? void 0 : viewer._id) === listing.host)
                listing.authorized = true;
            return listing;
        }
        catch (error) {
            throw new Error(`Failed to query listing: ${error}`);
        }
    });
}
exports.listing = listing;
function listings(_root, { location, filter, limit, page }, { db }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = {};
            let region = null;
            if (location) {
                const geocode = yield api_1.Google.geocode(location);
                query = utils_2.parseQuery(geocode);
                region = utils_2.parseRegion(query);
            }
            let cursor = yield db.listings.find(query);
            if (filter) {
                cursor =
                    filter === types_1.ListingsFilter.PRICE_LOW_TO_HIGH
                        ? cursor.sort({ price: 1 })
                        : cursor.sort({ price: -1 });
            }
            cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0).limit(limit);
            return {
                region,
                total: yield cursor.count(),
                result: yield cursor.toArray(),
            };
        }
        catch (error) {
            throw new Error(`Failed to query listings: ${error}`);
        }
    });
}
exports.listings = listings;
