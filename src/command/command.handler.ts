import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DynamicCommand } from './dynamicCommand';



@CommandHandler(DynamicCommand)
export class DynamicCommandHandler implements ICommandHandler<DynamicCommand> {
  constructor() {}

  async execute(command: DynamicCommand): Promise<any> {
    const { commandName, payload } = command;

    switch (commandName) {
      case 'createUser':
        

      case 'deleteUser':
        

      default:
        throw new Error(`Unknown command: ${commandName}`);
    }
  }
}
