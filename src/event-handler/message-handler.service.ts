import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WechatyEvent, WechatyMessageEventPayload } from 'src/interface';

@Injectable()
export class MessageHandlerService {
  private readonly logger = new Logger(MessageHandlerService.name);

  @OnEvent(WechatyEvent.Message)
  async onMessage (payload: WechatyMessageEventPayload) {
    const { message } = payload;
    this.logger.log(`On Message event: ${message}`);
  }
}
