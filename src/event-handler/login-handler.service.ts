import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import * as moment from 'moment-timezone';
import { WechatyEvent, WechatyLoginEventPayload } from 'src/interface';
import { NotificationService } from 'src/notification/notification.service';
import { ContactSelf } from 'wechaty';

@Injectable()
export class LoginHandlerService {
  @Inject()
  private readonly notificationService: NotificationService;

  @Inject()
  private readonly configService: ConfigService;

  private readonly logger = new Logger(LoginHandlerService.name);

  @OnEvent(WechatyEvent.Login)
  async onLogin (payload: WechatyLoginEventPayload) {
    const { bot } = payload;
    
    this.logger.log(`Login event: ${bot}(${bot.id})`);
    await this.sendLoginNotification(bot);
  }

  private async sendLoginNotification (bot: ContactSelf) {
    const version = this.configService.get<string>('packageVersion');
    this.notificationService.sendCardMessageToLark({
      header: {
        title: {
          tag: 'plain_text',
          content: `${bot.name()}(${bot.id}) Login`,
        },
        template: 'indigo',
      },
      elements: [{
        tag: 'markdown',
        content: `Time: **${moment().tz('Asia/Shanghai').format('YYYY-MM-DD hh:mm:ss')}**\n*Version*: **${version}**`
      }]
    });
  }
}
