"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayItCommandHandler = void 0;
const botbuilder_1 = require("botbuilder");
const textToSpeech_1 = __importDefault(require("./lib/textToSpeech"));
const generateRandomString_1 = __importDefault(require("./lib/generateRandomString"));
const uploadToBlobStorage_1 = __importDefault(require("./lib/uploadToBlobStorage"));
const adaptivecards_tools_1 = require("@microsoft/adaptivecards-tools");
const sayitCommand_json_1 = __importDefault(require("./adaptiveCards/sayitCommand.json"));
const sayitRegex = /^\/sayit(?<voice>-[a-zA-Z0-9]{20}|-carlo|-sean|-morganfreeman)?(?<stability>:\d{1,3})?(?<similarity_boost>:\d{1,3})?\s+?(?<text>.*)/i;
/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
class SayItCommandHandler {
    constructor() {
        this.triggerPatterns = "/sayit";
    }
    async handleCommandReceived(context, message) {
        var _a;
        let voiceId = '21m00Tcm4TlvDq8ikWAM';
        let stability = 0.25;
        let similarityBoost = 1.0;
        let text = '';
        if (sayitRegex.test(message.text)) {
            const groups = (_a = sayitRegex.exec(message.text)) === null || _a === void 0 ? void 0 : _a.groups;
            if (groups.voice) {
                voiceId = groups.voice;
            }
            if (groups.stability) {
                stability = parseInt(groups.stability.substring(1)) / 100;
            }
            if (groups.similarity_boost) {
                similarityBoost = parseInt(groups.similarity_boost.substring(1)) / 100;
            }
            text = groups.text;
            console.log(`Bot received voice: ${voiceId}, text: ${text}, stability: ${stability}, similarity_boost: ${similarityBoost}`);
        }
        else {
            return;
        }
        switch (voiceId) {
            case '-carlo':
                voiceId = 'V6pXnpwxCmJefM1vxcJy';
                break;
            case '-sean':
                voiceId = 'gnkDaXXtOTpeDxkvu2wk';
                break;
            case '-morganfreeman':
                voiceId = 'nGdyGffAzzIJLFV5gioH';
                break;
        }
        const speechBuffer = await (0, textToSpeech_1.default)(text, voiceId, stability, similarityBoost);
        const fileName = (0, generateRandomString_1.default)(64);
        const speechUrl = await (0, uploadToBlobStorage_1.default)(`sayit`, fileName + '.mp3', speechBuffer);
        // Render your adaptive card for reply message
        const cardData = {
            title: "Say It Audio Result",
            body: text,
            audioUrl: speechUrl,
        };
        const cardJson = adaptivecards_tools_1.AdaptiveCards.declare(sayitCommand_json_1.default).render(cardData);
        //return MessageFactory.text(speechUrl);
        return botbuilder_1.MessageFactory.attachment(botbuilder_1.CardFactory.adaptiveCard(cardJson));
    }
}
exports.SayItCommandHandler = SayItCommandHandler;
//# sourceMappingURL=sayItCommandHandler.js.map