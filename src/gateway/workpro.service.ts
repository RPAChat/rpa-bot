import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkProGatewayService {
  async getTokenWithWxid (wxid: string) {
    // TODO: get token using wxid.
  }

  async createTokenForWxid (wxid: string) {
    // TODO: create a token for a given wxid
  }

  async getTokenListForWxid (wxid: string) {
    // TODO: get token list for a given wxid
  }

  async getTokenExpireDate (wxid: string, token: string) {
    // TODO: get token expire date with given wxid and token
  }
}
