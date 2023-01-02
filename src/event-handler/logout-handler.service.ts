import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WechatyEvent, WechatyLogoutEventPayload } from 'src/interface';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class LogoutHandlerService {
  @Inject()
  private readonly notificationService: NotificationService;

  private readonly logger = new Logger(LogoutHandlerService.name);

  @OnEvent(WechatyEvent.Logout)
  async onLogoutEvent (payload: WechatyLogoutEventPayload) {
    const { bot, reason } = payload;
    this.logger.log(`Logout ${bot}, reason: ${reason}`);
    this.notificationService.sendTextMessageToLark(`Bot 「${bot.name()}(${bot.id})」 logout with reason: ${reason}`)
  }
}
