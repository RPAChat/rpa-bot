import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WechatyEvent, WechatyFriendshipEventPayload, WechatyLoginEventPayload, WechatyLogoutEventPayload, WechatyMessageEventPayload, WechatyScanEventPayload } from 'src/interface';
import { Wechaty, WechatyBuilder } from 'wechaty';

import { PuppetService } from 'wechaty-puppet-service';

interface WecomBot {
  token: string,
  wechaty: Wechaty,
}

@Injectable()
export class WechatyService implements OnApplicationBootstrap {
  @Inject()
  private readonly configService: ConfigService;

  @Inject()
  private eventEmitter: EventEmitter2

  private readonly logger = new Logger(WechatyService.name)

  private wecomBotArray: WecomBot[] = []

  async onApplicationBootstrap() {
    const wecomBotTokenList = this.configService.get<string[]>('wecomBotTokenList');
    if (wecomBotTokenList.length === 0) {
      this.logger.warn(`No wecom bot token found, can not start the program normally.`);
    }
    for (const wecomBotToken of wecomBotTokenList) {
      await this.initWecomBot(wecomBotToken);
    }
  }

  async initWecomBot (wecomBotToken: string) {
    this.logger.log(`init wecom bot: ${wecomBotToken}`);
    const puppet = new PuppetService({
      token: wecomBotToken,
      tls: { disable: true },
    });
    const wechaty = WechatyBuilder.build({
      puppet,
    });

    this.wecomBotArray.push({
      token: wecomBotToken,
      wechaty,
    });

    wechaty.on('scan', (qrcode, status, data) => {
      const payload: WechatyScanEventPayload = {
        qrcode,
        status,
        data,
      };
      this.eventEmitter.emit(WechatyEvent.Scan, payload);
    }).on('login', bot => {
      const payload: WechatyLoginEventPayload = {
        bot,
      };
      this.eventEmitter.emit(WechatyEvent.Login, payload);
    }).on('ready', () => {
      this.eventEmitter.emit(WechatyEvent.Ready);
    }).on('logout', (bot, reason) => {
      const payload: WechatyLogoutEventPayload = {
        bot,
        reason,
      }
      this.eventEmitter.emit(WechatyEvent.Logout, payload);
    }).on('message', message => {
      const payload: WechatyMessageEventPayload = {
        message,
      };
      this.eventEmitter.emit(WechatyEvent.Message, payload);
    }).on('friendship', friendship => {
      const payload: WechatyFriendshipEventPayload = {
        friendship,
      }
      this.eventEmitter.emit(WechatyEvent.Friendship, payload);
    });

    await wechaty.start().catch(e => {
      this.logger.error(e);
    })
  }
}
