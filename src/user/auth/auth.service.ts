import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async createJWT(name: string, email: string, picture: string) {
    // 鍵をファイルから読み込み
    const _privateKey = fs.readFileSync('./private.key');

    type TokenPayload = {
      sub: string;
      name: string;
      picture: string;
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': string[];
        'x-hasura-default-role': string;
        'x-hasura-user-id': string;
      };
    };

    const payload: TokenPayload = {
      sub: email,
      name: name,
      picture: picture,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['User', 'line', 'anonymous'],
        'x-hasura-default-role': 'User',
        'x-hasura-user-id': email,
      },
    };

    const expirationSeconds = 60 * 60 * 24 * 14;
    const token: string = jwt.sign(payload, _privateKey, {
      expiresIn: expirationSeconds,
      algorithm: 'RS256',
    });

    console.log('token ->', token);
    return token;
  }
}
