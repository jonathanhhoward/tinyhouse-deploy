"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingResolvers = void 0;
const Query_1 = require("./Query");
const Mutation_1 = require("./Mutation");
const Listing_1 = require("./Listing");
exports.listingResolvers = {
    Query: {
        listing: Query_1.listing,
        listings: Query_1.listings,
    },
    Mutation: {
        hostListing: Mutation_1.hostListing,
    },
    Listing: {
        id: Listing_1.id,
        host: Listing_1.host,
        bookingsIndex: Listing_1.bookingsIndex,
        bookings: Listing_1.bookings,
    },
};
