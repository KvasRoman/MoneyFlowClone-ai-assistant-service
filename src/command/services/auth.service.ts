import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(@Inject("AUTH_SERVICE") private readonly authClient: ClientProxy) {}

  async validate(tokens: {accessToken: string, refreshToken: string}){
    const result : {account:{ id: string, email: string}} = await this.authClient
        .send({cmd: 'validate_token'}, { token: tokens.accessToken, refreshToken: tokens.refreshToken })
        .toPromise();
    return result.account;
  }
}
