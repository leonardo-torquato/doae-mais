import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      // Compara a senha enviada com o hash salvo no DB
      const isMatch = await bcrypt.compare(pass, user.password); 
      
      if (isMatch) {
        // Retorna o usuário sem a senha
        const { password, ...result } = user;
        return result;
      }
    }
    return null; // Retorna null se falhar
  }

  //Gera o token.
  async login(user: any) {
    
    const payload = { email: user.email, sub: user.id }; // 'sub' (subject) é o padrão JWT para ID
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  } 
}
