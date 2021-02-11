"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRegion = exports.parseQuery = void 0;
function parseQuery({ country, admin, city, }) {
    if (!country)
        throw new Error("no country found");
    const query = {};
    if (city)
        query.city = city;
    if (admin)
        query.admin = admin;
    query.country = country;
    return query;
}
exports.parseQuery = parseQuery;
function parseRegion({ country, admin, city }) {
    const cityText = city ? city + ", " : "";
    const adminText = admin ? admin + ", " : "";
    return cityText + adminText + country;
}
exports.parseRegion = parseRegion;
