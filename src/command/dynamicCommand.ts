export class DynamicCommand {
    constructor(
      public readonly commandName: string, // e.g., "createUser"
      public readonly payload: any // Dynamic data
    ) {}
  }
  