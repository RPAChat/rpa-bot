import { Inject, Injectable, Logger } from '@nestjs/common';
import { Message } from 'wechaty';
import * as PUPPET from 'wechaty-puppet';
import { CommandConfig } from './command.config';

@Injectable()
export class CommandService {
  @Inject()
  private readonly commandConfig: CommandConfig;

  private readonly logger = new Logger(CommandService.name);

  /**
   * This function only process messages that happened in private contact, not room
   *
   * **PAY ATTENTION** to not call this method for message in room.
   * @param message message to be processed as a command
   */
  async processContactCommand (message: Message) {
    const messageType = message.type();
    if (messageType !== PUPPET.types.Message.Text) {
      this.logger.log(`skip process command since the message is not text format.`);
      return;
    }
    const text = message.text().trim();
    const contact = message.talker();

    const helpMessage = this.processHelpCommand(text);
    if (helpMessage) {
      await contact.say(helpMessage);
      return;
    }

    const matchedConfigs = this.commandConfig.getMatchedConfigs(text);

    for (const config of matchedConfigs) {
      const messages = await config.processor.process(message);
      for (const message of messages) {
        await contact.say(message);
      }
    }
  }

  private processHelpCommand (text: string) {
    if (/^(帮助|help)$/.test(text)) {
      const configs = this.commandConfig.getAllConfigs();
      return configs.map(c => c.name).join('\n');
    }
    return null;
  }
}
