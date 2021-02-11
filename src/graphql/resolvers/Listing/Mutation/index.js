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
exports.hostListing = void 0;
const mongodb_1 = require("mongodb");
const api_1 = require("../../../../lib/api");
const utils_1 = require("../../../../lib/utils");
const utils_2 = require("./utils");
function hostListing(_root, { input }, { db, req }) {
    return __awaiter(this, void 0, void 0, function* () {
        utils_2.verifyHostListingInput(input);
        const viewer = yield utils_1.authorize(db, req);
        if (!viewer)
            throw new Error("viewer cannot be found");
        const { country, admin, city } = yield api_1.Google.geocode(input.address);
        if (!country || !admin || !city)
            throw new Error("invalid address input");
        const imageUrl = yield api_1.Cloudinary.upload(input.image);
        const insertResult = yield db.listings.insertOne(Object.assign(Object.assign({ _id: new mongodb_1.ObjectId() }, input), { image: imageUrl, bookings: [], bookingsIndex: {}, country,
            admin,
            city, host: viewer._id }));
        const insertedListing = insertResult.ops[0];
        yield db.users.updateOne({ _id: viewer._id }, { $push: { listings: insertedListing._id } });
        return insertedListing;
    });
}
exports.hostListing = hostListing;
