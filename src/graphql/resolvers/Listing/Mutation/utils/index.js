"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHostListingInput = void 0;
const types_1 = require("../../../../../lib/types");
function verifyHostListingInput({ title, description, type, price, }) {
    if (title.length > 100)
        throw new Error("listing title must be under 100 characters");
    if (description.length > 5000)
        throw new Error("listing description must be under 5000 characters");
    if (type !== types_1.ListingType.Apartment && type !== types_1.ListingType.House)
        throw new Error("listing type must be either an apartment or a house");
    if (price < 0)
        throw new Error("price must be greater than 0");
}
exports.verifyHostListingInput = verifyHostListingInput;
