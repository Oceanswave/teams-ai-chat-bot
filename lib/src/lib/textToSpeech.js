"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const textToSpeech = async (text, voice_id, stability = 0.25, similarity_boost = 1, apiKey) => {
    if (!stability) {
        stability = 0.25;
    }
    if (!similarity_boost) {
        similarity_boost = 1;
    }
    try {
        const xiTextToSpeechUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`;
        const response = await (0, axios_1.default)({
            method: 'POST',
            url: xiTextToSpeechUrl,
            data: {
                text,
                voice_settings: {
                    stability,
                    similarity_boost
                }
            },
            headers: {
                'Accept': 'audio/mpeg',
                'xi-api-key': apiKey || process.env.XI_API_KEY,
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer'
        });
        return Buffer.from(response.data);
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = textToSpeech;
//# sourceMappingURL=textToSpeech.js.map