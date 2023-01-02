import { Module } from '@nestjs/common';
import { WorkProGatewayService } from './workpro.service';

@Module({
  providers: [
    WorkProGatewayService,
  ],
  exports: [
    WorkProGatewayService,
  ],
})
export class GatewayModule {};
