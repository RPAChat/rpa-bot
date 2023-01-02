import { Module } from '@nestjs/common';
import { CommandModule } from './command/command.module';
import { MessageGenerator } from './generator';
import { MessageService } from './message.service';

@Module({
  imports: [
    CommandModule,
  ],
  providers: [
    MessageGenerator,
    MessageService,
  ],
  exports: [
    MessageGenerator,
  ],
})
export class MessageModule {}
