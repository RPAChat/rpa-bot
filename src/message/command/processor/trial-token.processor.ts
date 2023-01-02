import { Injectable } from '@nestjs/common';
import { Message } from 'wechaty';
import { BaseProcessor } from './base.processor';

@Injectable()
export class TrialTokenProcessor extends BaseProcessor {
  async process (message: Message) {
    void message;
    return ['你的试用token是这个'];
  }
}
