"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const bytes = crypto_1.default.randomBytes(length);
    const result = [];
    for (let i = 0; i < length; i++) {
        const index = Math.floor((bytes[i] / 256) * charset.length);
        result.push(charset[index]);
    }
    return result.join('');
}
exports.default = generateRandomString;
//# sourceMappingURL=generateRandomString.js.map