"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DreamCommandHandler = void 0;
const botbuilder_1 = require("botbuilder");
const textToImage_1 = __importDefault(require("./lib/textToImage"));
const adaptivecards_tools_1 = require("@microsoft/adaptivecards-tools");
const dreamCommand_json_1 = __importDefault(require("./adaptiveCards/dreamCommand.json"));
const dreamRegex = /^\/dream\s+?(?<text>.*)/i;
/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
class DreamCommandHandler {
    constructor() {
        this.triggerPatterns = "/dream";
    }
    async handleCommandReceived(context, message) {
        var _a;
        let text = '';
        if (dreamRegex.test(message.text)) {
            const groups = (_a = dreamRegex.exec(message.text)) === null || _a === void 0 ? void 0 : _a.groups;
            text = groups.text;
            console.log(`Bot received dream: ${text}`);
        }
        else {
            return;
        }
        const imageUrls = await (0, textToImage_1.default)(text);
        // Render your adaptive card for reply message
        const cardData = {
            title: "Dream Image Result",
            body: text,
            imageUrl: imageUrls[0],
        };
        const cardJson = adaptivecards_tools_1.AdaptiveCards.declare(dreamCommand_json_1.default).render(cardData);
        //return MessageFactory.text(speechUrl);
        return botbuilder_1.MessageFactory.attachment(botbuilder_1.CardFactory.adaptiveCard(cardJson));
    }
}
exports.DreamCommandHandler = DreamCommandHandler;
//# sourceMappingURL=dreamCommandHandler.js.map