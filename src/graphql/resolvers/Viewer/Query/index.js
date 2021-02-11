"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUrl = void 0;
const api_1 = require("../../../../lib/api");
function authUrl() {
    try {
        return api_1.Google.authUrl;
    }
    catch (error) {
        throw new Error(`Failed to query Google Auth Url: ${error}`);
    }
}
exports.authUrl = authUrl;
