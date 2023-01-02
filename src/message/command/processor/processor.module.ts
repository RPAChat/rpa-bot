import { Module } from '@nestjs/common';
import { BuyTokenProcessor } from './buy-token.processor';
import { DefaultProcessor } from './default.processor';
import { TrialTokenProcessor } from './trial-token.processor';

@Module({
  providers: [
    TrialTokenProcessor,
    BuyTokenProcessor,
    DefaultProcessor,
  ],
  exports: [
    TrialTokenProcessor,
    BuyTokenProcessor,
    DefaultProcessor,
  ],
})
export class ProcessorModule {}
