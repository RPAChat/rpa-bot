import { Injectable } from '@nestjs/common';;
import { Message, Sayable } from 'wechaty';

@Injectable()
export abstract class BaseProcessor {
  abstract process (message: Message): Promise<Sayable[]>
}
