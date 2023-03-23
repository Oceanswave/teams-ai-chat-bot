"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GptCommandHandler = void 0;
const botbuilder_1 = require("botbuilder");
const openai_1 = require("openai");
/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
class GptCommandHandler {
    constructor() {
        this.triggerPatterns = "/gpt";
    }
    async handleCommandReceived(context, message) {
        const prompt = message.text.substring(message.text.toLowerCase().indexOf("/gpt ") + 5);
        console.log(`Bot received prompt: ${prompt}`);
        const configuration = new openai_1.Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new openai_1.OpenAIApi(configuration);
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant with a poor opinion of JIRA" },
                { role: "user", content: prompt },
            ]
        });
        // // Render your adaptive card for reply message
        // const cardData: CardData = {
        //   title: "Your Hello World Bot is Running",
        //   body: "Congratulations! Your hello world bot is running. Click the documentation below to learn more about Bots and the Teams Toolkit.",
        // };
        // const cardJson = AdaptiveCards.declare(helloWorldCard).render(cardData);
        return botbuilder_1.MessageFactory.text(completion.data.choices[0].message.content);
        //return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
    }
}
exports.GptCommandHandler = GptCommandHandler;
//# sourceMappingURL=gptCommandHandler.js.map