import { Module } from '@nestjs/common';
import { CommandConfig } from './command.config';
import { CommandService } from './command.service';
import { ProcessorModule } from './processor/processor.module';

@Module({
  imports: [
    ProcessorModule,
  ],
  providers: [
    CommandConfig,
    CommandService,
  ],
  exports: [
    CommandConfig,
    CommandService,
  ]
})
export class CommandModule {}
