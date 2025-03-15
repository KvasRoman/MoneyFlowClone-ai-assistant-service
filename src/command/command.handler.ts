import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DynamicCommand } from './dynamicCommand';
import { TransactionService } from './services/transaction.service';



@CommandHandler(DynamicCommand)
export class DynamicCommandHandler implements ICommandHandler<DynamicCommand> {
  constructor(private readonly trasactionService: TransactionService) {}

  async execute(command: DynamicCommand): Promise<any> {
    const { commandName, payload } = command;

    switch (commandName) {
      case 'create transaction':
        return this.trasactionService.createTransaction(payload);
      case 'deleteUser':
        

      default:
        throw new Error(`Unknown command: ${commandName}`);
    }
  }

  private async createTransaction(){
    
  }
}
