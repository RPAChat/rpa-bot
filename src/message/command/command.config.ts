import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BaseProcessor } from './processor/base.processor';
import { BuyTokenProcessor } from './processor/buy-token.processor';
import { DefaultProcessor } from './processor/default.processor';
import { TrialTokenProcessor } from './processor/trial-token.processor';

export interface CommandConfigData {
  regex: RegExp,
  name: string,
  description: string,
  example: string,
  processor: BaseProcessor,
}

@Injectable()
export class CommandConfig implements OnModuleInit {
  @Inject()
  private readonly trialTokenProcessor: TrialTokenProcessor;

  @Inject()
  private readonly buyTokenProcessor: BuyTokenProcessor;

  @Inject()
  private readonly defaultProcessor: DefaultProcessor;

  private commandConfigList: CommandConfigData[] = [];

  onModuleInit() {
    this.commandConfigList = [{
      regex: /workpro token/,
      name: '获取试用 WorkPro token',
      description: '获取到一个7天有效期的试用 workpro token，同一个微信账号只能获取一次试用 workpro token，如果需要长期使用，请购买 token。',
      example: 'workpro token',
      processor: this.trialTokenProcessor,
    }, {
      regex: /购买token/,
      name: '购买 token',
      description: '购买 token',
      example: '购买 token',
      processor: this.buyTokenProcessor,
    }];
  }

  getMatchedConfigs (text: string) {
    const configList = this.commandConfigList.filter(c => c.regex.test(text));
    if (configList.length !== 0) {
      return configList;
    }
    return [{
      regex: /default/,
      name: 'N/A',
      description: 'N/A',
      example: 'N/A',
      processor: this.defaultProcessor,
    }]
  }

  getAllConfigs () {
    return this.commandConfigList;
  }
}
