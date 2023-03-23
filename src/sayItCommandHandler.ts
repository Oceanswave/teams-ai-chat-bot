import { Activity, CardFactory, MessageFactory, TurnContext } from "botbuilder";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import textToSpeech from './lib/textToSpeech';
import generateRandomString from "./lib/generateRandomString";
import uploadToBlobStorage from "./lib/uploadToBlobStorage";

import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import sayItCard from "./adaptiveCards/sayitCommand.json";
import { AudioCardData } from "./cardModels";

const sayitRegex = /^\/sayit(?<voice>-[a-zA-Z0-9]{20}|-carlo|-sean|-morganfreeman)?(?<stability>:\d{1,3})?(?<similarity_boost>:\d{1,3})?\s+?(?<text>.*)/i;
/**
 * The `HelloWorldCommandHandler` registers a pattern with the `TeamsFxBotCommandHandler` and responds
 * with an Adaptive Card if the user types the `triggerPatterns`.
 */
export class SayItCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "/sayit";

  async handleCommandReceived(
    context: TurnContext,
    message: CommandMessage
  ): Promise<string | Partial<Activity> | void> {
    let voiceId = '21m00Tcm4TlvDq8ikWAM';
    let stability = 0.25;
    let similarityBoost = 1.0;
    let text = '';
    if (sayitRegex.test(message.text)) {
      const groups = sayitRegex.exec(message.text)?.groups
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
    } else {
      return;
    }

    switch(voiceId) {
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

    const speechBuffer = await textToSpeech(text, voiceId, stability, similarityBoost);
    const fileName = generateRandomString(64);
    const speechUrl = await uploadToBlobStorage(`sayit`, fileName + '.mp3', speechBuffer);

    // Render your adaptive card for reply message
    const cardData: AudioCardData = {
      title: "Say It Audio Result",
      body: text,
      audioUrl: speechUrl,
    };

    const cardJson = AdaptiveCards.declare(sayItCard).render(cardData);
    //return MessageFactory.text(speechUrl);
    return MessageFactory.attachment(CardFactory.adaptiveCard(cardJson));
  }
}
