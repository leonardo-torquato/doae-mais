// src/backend/auth/strategies/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Pega o Token do "Bearer"
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'SEGREDO_PADRAO_PARA_TESTES',
    });
  }

  async validate(payload: any) {
    // O 'payload' é o objeto colocado no token; o Passport anexa isso ao request (req.user)
    return { userId: payload.sub, email: payload.email };
  }
}