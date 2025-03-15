import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TransactionService {
  constructor(@Inject("TRANSACTION_SERVICE") private readonly transactionClient: ClientProxy) {}

  async createTransaction(dto: {accountId: string, amount: number, desicription?: string, transactionDate: Date, currency: string}) {
        
    return await firstValueFrom(
        this.transactionClient.send({ cmd: "create_transaction" }, dto));
}
}
