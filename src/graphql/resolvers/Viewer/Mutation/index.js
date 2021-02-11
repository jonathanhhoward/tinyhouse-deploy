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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectStripe = exports.connectStripe = exports.logOut = exports.logIn = void 0;
const crypto_1 = __importDefault(require("crypto"));
const api_1 = require("../../../../lib/api");
const utils_1 = require("../../../../lib/utils");
const utils_2 = require("./utils");
function logIn(_root, { input }, { db, req, res }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const code = input === null || input === void 0 ? void 0 : input.code;
            const token = crypto_1.default.randomBytes(16).toString("hex");
            const viewer = code
                ? yield utils_2.logInViaGoogle(code, token, db, res)
                : yield utils_2.logInViaCookie(token, db, req, res);
            return viewer
                ? {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true,
                }
                : { didRequest: true };
        }
        catch (error) {
            throw new Error(`Failed to log in: ${error}`);
        }
    });
}
exports.logIn = logIn;
function logOut(_root, _args, { res }) {
    try {
        res.clearCookie("viewer", utils_2.cookieOptions);
        return { didRequest: true };
    }
    catch (error) {
        throw new Error(`Failed to log out: ${error}`);
    }
}
exports.logOut = logOut;
function connectStripe(_root, { input }, { db, req }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { code } = input;
            let viewer = yield utils_1.authorize(db, req);
            if (!viewer)
                throw new Error("viewer cannot be found");
            const wallet = yield api_1.Stripe.connect(code);
            if (!wallet)
                throw new Error("stripe grant error");
            const updateRes = yield db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: wallet.stripe_user_id } }, { returnOriginal: false });
            if (!updateRes.value)
                throw new Error("viewer could not be updated");
            viewer = updateRes.value;
            return {
                _id: viewer._id,
                token: viewer.token,
                avatar: viewer.avatar,
                walletId: viewer.walletId,
                didRequest: true,
            };
        }
        catch (error) {
            throw new Error(`Failed to connect with Stripe: ${error}`);
        }
    });
}
exports.connectStripe = connectStripe;
function disconnectStripe(_root, _args, { db, req }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let viewer = yield utils_1.authorize(db, req);
            if (!viewer)
                throw new Error("viewer cannot be found");
            const updateRes = yield db.users.findOneAndUpdate({ _id: viewer._id }, { $set: { walletId: undefined } }, { returnOriginal: false });
            if (!updateRes.value)
                throw new Error("viewer could not be updated");
            viewer = updateRes.value;
            return {
                _id: viewer._id,
                token: viewer.token,
                avatar: viewer.avatar,
                walletId: viewer.walletId,
                didRequest: true,
            };
        }
        catch (error) {
            throw new Error(`Failed to disconnect with Stripe: ${error}`);
        }
    });
}
exports.disconnectStripe = disconnectStripe;
