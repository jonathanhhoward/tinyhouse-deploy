"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewerResolvers = void 0;
const Query_1 = require("./Query");
const Mutation_1 = require("./Mutation");
const Viewer_1 = require("./Viewer");
exports.viewerResolvers = {
    Query: {
        authUrl: Query_1.authUrl,
    },
    Mutation: {
        logIn: Mutation_1.logIn,
        logOut: Mutation_1.logOut,
        connectStripe: Mutation_1.connectStripe,
        disconnectStripe: Mutation_1.disconnectStripe,
    },
    Viewer: {
        id: Viewer_1.id,
        hasWallet: Viewer_1.hasWallet,
    },
};
