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
exports.Stripe = void 0;
const stripe_1 = require("stripe");
const stripe = new stripe_1.Stripe(`${process.env.S_SECRET_KEY}`, {
    apiVersion: "2020-08-27",
});
class Stripe {
    static connect(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stripe.oauth.token({
                grant_type: "authorization_code",
                code,
            });
        });
    }
    static charge(amount, source, stripeAccount) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield stripe.charges.create({
                amount,
                currency: "usd",
                source,
                application_fee_amount: Math.round(amount * 0.05),
            }, {
                stripe_account: stripeAccount,
            });
            if (res.status !== "succeeded") {
                throw new Error("failed to create charge with Stripe");
            }
        });
    }
}
exports.Stripe = Stripe;
