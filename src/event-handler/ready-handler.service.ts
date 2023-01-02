import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WechatyEvent } from 'src/interface';

@Injectable()
export class ReadyHandlerService {
  private readonly logger = new Logger(ReadyHandlerService.name);

  @OnEvent(WechatyEvent.Ready)
  onReadyEvent () {
    this.logger.log(`receive ready event`);
  }
}
