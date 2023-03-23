import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import textToImage from './lib/textToImage';
import generateRandomString from "./lib/generateRandomString";
import uploadToBlobStorage from "./lib/uploadToBlobStorage";

import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import dreamCard from "./adaptiveCards/dreamCommand.json";
import { ImageCardData } from "./cardModels";

const dreamRegex = /^\/dream\s+?(?<text>.*)/i;
/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class DreamCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "/dream";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    let text = '';
    if (dreamRegex.test(message.text)) {
      const groups = dreamRegex.exec(message.text)?.groups
      text = groups.text;      
      console.log(`Bot received dream: text: ${text}`);
    } else {
      return;
    }

    const imageUrls = [];
    const imageBuffers = await textToImage(text);
    for (const buffer of imageBuffers) {
      const fileName = generateRandomString(64);
      const imageUrl = await uploadToBlobStorage(`dreamtti`, fileName + '.png', buffer);
      imageUrls.push(imageUrl);
    }

    // Render your adaptive card for reply message
    const cardData: ImageCardData = {
      title: "Dream Image Result",
      body: text,
      imageUrl: imageUrls[0],
    };

    const cardJson = AdaptiveCards.declare(dreamCard).render(cardData);
    //return MessageFactory.text(speechUrl);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}
