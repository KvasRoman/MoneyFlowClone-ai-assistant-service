import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommandService } from './command.service';
import { ServicesModule } from './services/services.module';
import { DynamicCommandHandler } from './command.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [ServicesModule, CqrsModule],
  providers: [CommandService,DynamicCommandHandler],
  exports: [CommandService]
})
export class CommandModule {}
