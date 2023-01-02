import axios from 'axios'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SECOND } from 'src/consts'

const BASE_URL = 'https://open.feishu.cn/open-apis/bot/v2/hook/'

@Injectable()
export class NotificationService {
  @Inject()
  private readonly configService: ConfigService

  private readonly logger = new Logger(NotificationService.name)

  async sendCardMessageToLark (json: any) {
    const larkWebhookKey = this.configService.get('larkWebhookKey')
    if (!larkWebhookKey) {
      this.logger.debug(`skip send webhook since no lark webhook key configured.`);
      return;
    }
    try {
      await axios({
        url: `${BASE_URL}${larkWebhookKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          msg_type: 'interactive',
          card: json,
        },
        timeout: 5 * SECOND,
      })
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`sendMessageToLark failed with error:\n${e?.stack || e?.message}`);
    }
  }

  async sendTextMessageToLark(text: string) {
    const larkWebhookKey = this.configService.get('larkWebhookKey')
    if (!larkWebhookKey) {
      this.logger.debug(`skip send webhook since no lark webhook key configured.`);
      return;
    }
    try {
      await axios({
        url: `${BASE_URL}${larkWebhookKey}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          msg_type: 'text',
          content: { text },
        },
        timeout: 5 * SECOND,
      })
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.logger.error(`sendMessageToLark failed with error:\n${e?.stack || e?.message}`);
    }
  }
}
