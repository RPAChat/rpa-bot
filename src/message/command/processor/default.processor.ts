import { Injectable } from '@nestjs/common';
import { Message } from 'wechaty';
import { BaseProcessor } from './base.processor';

@Injectable()
export class DefaultProcessor extends BaseProcessor {
  async process(message: Message) {
    const text = message.text();
    const defaultMessages = [
      '我不太懂你说的这个是什么意思，我只是一个机器人，我能做的事情很有限',
      '不好意思，我理解不了你说的这个，我只是一个机器人',
      '啊，我不懂诶，我还不够智能，无法帮你解决你的问题'
    ];
    const index = text.length;
    return [`${defaultMessages[index % defaultMessages.length]}。\n你可以发「帮助」或者「help」给我来查看我的能力。`]
  }
}
