import { Injectable } from '@nestjs/common';
import { FileBox } from 'file-box';
import { buyTokenQrcodeUrl } from 'src/consts/contact';
import { Message } from 'wechaty';
import { BaseProcessor } from './base.processor';

@Injectable()
export class BuyTokenProcessor extends BaseProcessor {
  async process(message: Message) {
    void message;
    const fileBox = FileBox.fromUrl(buyTokenQrcodeUrl);
    return [
      '我们有专门负责提供购买服务的客服人员，请扫码联系我们的客服进行购买，感谢支持',
      fileBox,
    ];
  }
}
