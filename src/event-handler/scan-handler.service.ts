import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WechatyEvent, WechatyScanEventPayload } from 'src/interface';

@Injectable()
export class ScanHandlerService {
  private readonly logger = new Logger(ScanHandlerService.name);

  @OnEvent(WechatyEvent.Scan)
  async onScan (payload: WechatyScanEventPayload) {
    const { qrcode, status, data } = payload;
    this.logger.debug(`Scan event: qrcode: ${qrcode}, status: ${status}, data: ${data}`);
  }
}
