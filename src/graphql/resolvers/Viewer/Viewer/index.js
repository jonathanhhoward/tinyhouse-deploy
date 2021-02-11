"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasWallet = exports.id = void 0;
function id(viewer) {
    return viewer._id;
}
exports.id = id;
function hasWallet(viewer) {
    return !!viewer.walletId;
}
exports.hasWallet = hasWallet;
