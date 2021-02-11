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
exports.user = void 0;
const utils_1 = require("../../../../lib/utils");
function user(_root, { id }, { db, req }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield db.users.findOne({ _id: id });
            if (!user)
                throw new Error("user can't be found");
            const viewer = yield utils_1.authorize(db, req);
            if ((viewer === null || viewer === void 0 ? void 0 : viewer._id) === user._id)
                user.authorized = true;
            return user;
        }
        catch (error) {
            throw new Error(`Failed to query user: ${error}`);
        }
    });
}
exports.user = user;
