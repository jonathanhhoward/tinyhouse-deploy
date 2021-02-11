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
exports.logInViaCookie = exports.logInViaGoogle = exports.cookieOptions = void 0;
const api_1 = require("../../../../../lib/api");
exports.cookieOptions = {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: process.env.NODE_ENV !== "development",
};
function logInViaGoogle(code, token, db, res) {
    var _a, _b, _c, _d, _e, _f;
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = yield api_1.Google.logIn(code);
        if (!user)
            throw new Error("Google login error");
        const _id = (_c = (_b = (_a = user.names) === null || _a === void 0 ? void 0 : _a[0].metadata) === null || _b === void 0 ? void 0 : _b.source) === null || _c === void 0 ? void 0 : _c.id;
        const name = (_d = user.names) === null || _d === void 0 ? void 0 : _d[0].displayName;
        const avatar = (_e = user.photos) === null || _e === void 0 ? void 0 : _e[0].url;
        const contact = (_f = user.emailAddresses) === null || _f === void 0 ? void 0 : _f[0].value;
        if (!_id || !name || !avatar || !contact)
            throw new Error("Invalid Google user");
        const updateResult = yield db.users.findOneAndUpdate({ _id }, {
            $set: {
                name,
                avatar,
                contact,
                token,
            },
        }, { returnOriginal: false });
        let viewer = updateResult.value;
        if (!viewer) {
            const insertResult = yield db.users.insertOne({
                _id,
                name,
                avatar,
                contact,
                token,
                income: 0,
                bookings: [],
                listings: [],
            });
            viewer = insertResult.ops[0];
        }
        res.cookie("viewer", _id, Object.assign(Object.assign({}, exports.cookieOptions), { maxAge: 365 * 24 * 60 * 60 * 1000 }));
        return viewer;
    });
}
exports.logInViaGoogle = logInViaGoogle;
function logInViaCookie(token, db, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateResult = yield db.users.findOneAndUpdate({ _id: req.signedCookies.viewer }, { $set: { token } }, { returnOriginal: false });
        const viewer = updateResult.value;
        if (!viewer)
            res.clearCookie("viewer", exports.cookieOptions);
        return viewer;
    });
}
exports.logInViaCookie = logInViaCookie;
