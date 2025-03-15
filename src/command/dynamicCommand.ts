import { ICommand } from "@nestjs/cqrs";

export class DynamicCommand implements ICommand {
    
    constructor(
      public readonly commandName: string, // e.g., "createUser"
      public readonly payload: any // Dynamic data
    ) {}
  }
  