import { Module } from '@nestjs/common';
import { WechatyService } from './wechaty.service';

@Module({
  providers: [
    WechatyService,
  ],
})
export class WechatyModule {}
