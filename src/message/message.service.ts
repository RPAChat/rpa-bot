import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WechatyEvent, WechatyMessageEventPayload } from 'src/interface';
import { CommandService } from './command/command.service';

@Injectable()
export class MessageService {
  @Inject()
  private readonly commandService: CommandService;

  private readonly logger = new Logger(MessageService.name);

  @OnEvent(WechatyEvent.Message)
  async onMessage (payload: WechatyMessageEventPayload) {
    const { message } = payload;
    if (message.self()) {
      this.logger.debug(`skip process message from self.`);
      return;
    }
    const room = message.room();
    const mentionSelf = message.mentionSelf();

    if (room && !mentionSelf) {
      this.logger.debug(`skip process message in room and not mention self.`);
      return;
    }

    if (!room) {
      await this.commandService.processContactCommand(message);
    } else {
      // TODO: add logic to process message in room.
    }
  }
}
