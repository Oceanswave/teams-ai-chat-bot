"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function textToImage(text) {
    var _a;
    const engineId = 'stable-diffusion-v1-5';
    const apiHost = (_a = process.env.API_HOST) !== null && _a !== void 0 ? _a : 'https://api.stability.ai';
    const apiKey = process.env.STABILITY_API_KEY;
    if (!apiKey)
        throw new Error('Missing Stability API key.');
    const response = await fetch(`${apiHost}/v1/generation/${engineId}/text-to-image`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            text_prompts: [
                {
                    text,
                },
            ],
            cfg_scale: 7,
            sampler: "K_DPMPP_2M",
            height: 512,
            width: 512,
            samples: 1,
            steps: 25,
        }),
    });
    if (!response.ok) {
        throw new Error(`Non-200 response: ${await response.text()}`);
    }
    const responseJSON = (await response.json());
    const result = [];
    responseJSON.artifacts.forEach((image, index) => {
        result.push(Buffer.from(image.base64, 'base64'));
    });
    return result;
}
exports.default = textToImage;
//# sourceMappingURL=textToImage.js.map