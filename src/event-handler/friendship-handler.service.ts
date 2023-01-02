import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as PUPPET from 'wechaty-puppet';
import { WechatyEvent, WechatyFriendshipEventPayload } from 'src/interface';
import { Contact } from 'wechaty';
import { MessageGenerator } from 'src/message/generator';

@Injectable()
export class FriendshipHandlerService {
  @Inject()
  private readonly messageGenerator: MessageGenerator;

  private readonly logger = new Logger(FriendshipHandlerService.name)

  @OnEvent(WechatyEvent.Friendship)
  async onFriendshipEvent (payload: WechatyFriendshipEventPayload) {
    const { friendship } = payload;
    const type = friendship.type();
    const contact = friendship.contact();
    this.logger.log(`Receive friendship event: ${contact}, type: ${PUPPET.types.Friendship[type]}`);
    switch (type) {
      case PUPPET.types.Friendship.Receive:
        await friendship.accept();
        break;

      case PUPPET.types.Friendship.Confirm:
        await this.handleNewFriend(contact);
        break;

      case PUPPET.types.Friendship.Verify:
      case PUPPET.types.Friendship.Unknown:
        break;
      
      default:
        break;
    }
  }

  private async handleNewFriend (contact: Contact) {
    await this.sendWelcomeMessage(contact);
  }

  private async sendWelcomeMessage (contact: Contact) {
    const messageList = await this.messageGenerator.newFriendWelcome(contact);
    for (const message of messageList) {
      await contact.say(message);
    }
  }
}
