import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventHandlerModule } from './event-handler/event-handler.module';
import { WechatyModule } from './wechaty/wechaty.module';
import configuration from './config/configuration';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),    
    EventEmitterModule.forRoot(),
    WechatyModule,
    EventHandlerModule,
    NotificationModule,
  ],
})
export class AppModule {}
