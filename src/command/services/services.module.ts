import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'TRANSACTION_SERVICE',
                transport: Transport.TCP,
                options: { host: '127.0.0.1', port: 3003 },
            },
        ]),
        ClientsModule.register([
            {
                name: 'AUTH_SERVICE',
                transport: Transport.TCP,
                options: { host: '127.0.0.1', port: 3001 }, // Connect to auth-service
            },
        ]),
    ],
    providers: [TransactionService, AuthService],
    exports: [TransactionService, AuthService]
})
export class ServicesModule { }
