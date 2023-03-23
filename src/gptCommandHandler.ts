import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import helloWorldCard from "./adaptiveCards/helloworldCommand.json";
import { CardData } from "./cardModels";
import { Configuration, OpenAIApi } from "openai";

/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class GptCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "/gpt";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    const prompt = message.text.substring(message.text.toLowerCase().indexOf("/gpt ") + 5);
    console.log(`Bot received prompt: ${prompt}`);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a helpful assistant with a poor opinion of JIRA"},
        {role: "user", content: prompt},
      ]
    });

    // // Render your adaptive card for reply message
    // const cardData: CardData = {
    //   title: "Your Hello World Bot is Running",
    //   body: "Congratulations! Your hello world bot is running. Click the documentation below to learn more about Bots and the Teams Toolkit.",
    // };

    // const cardJson = AdaptiveCards.declare(helloWorldCard).render(cardData);
    return MessageFactory.text(completion.data.choices[0].message.content);
    //return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}
