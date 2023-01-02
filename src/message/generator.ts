import { Injectable } from '@nestjs/common';
import { Contact } from 'wechaty';

@Injectable()
export class MessageGenerator {
  async newFriendWelcome (contact: Contact) {
    return [
      `你好 ${contact.name()}\n`
      + `我是 RPA bot，一个不是很聪明的机器人。\n`
      + `想要领取试用的 WorkPro token，请和我说「workpro token」`
      + `想知道我还能做什么，可以发「帮助」或者「help」，我会告诉你我的技能清单`,
    ];
  }
}
