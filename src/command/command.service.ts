import { Injectable } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { DynamicCommand } from './dynamicCommand';
import { CommandBus } from '@nestjs/cqrs';

@Injectable()
export class CommandService {
    constructor(private readonly commandBus: CommandBus) {
        
    }
    async execute(command: DynamicCommand){
        return await this.commandBus.execute(command);
    }
}
