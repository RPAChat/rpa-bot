import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { NotificationModule } from 'src/notification/notification.module';
import { LoginHandlerService } from './login-handler.service';
import { LogoutHandlerService } from './logout-handler.service';
import { MessageHandlerService } from './message-handler.service';
import { ScanHandlerService } from './scan-handler.service';

@Module({
  imports: [
    NotificationModule,
    MessageModule,
  ],
  providers: [
    LoginHandlerService,
    LogoutHandlerService,
    MessageHandlerService,
    ScanHandlerService,
  ],
})
export class EventHandlerModule {}
