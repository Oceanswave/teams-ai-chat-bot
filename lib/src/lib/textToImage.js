"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
async function textToImage(text) {
    const configuration = new openai_1.Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new openai_1.OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: text,
        n: 1,
        size: '1024x1024',
    });
    if (response.status !== 200) {
        throw new Error(`Non-200 response: ${response.statusText}`);
    }
    const result = [];
    response.data.data.forEach((image, index) => {
        result.push(image.url);
    });
    return result;
}
exports.default = textToImage;
//# sourceMappingURL=textToImage.js.map