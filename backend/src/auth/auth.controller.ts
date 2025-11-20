import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local')) // 1. Usa o LocalStrategy
    @Post('login')
    async login(@Request() req, @Body() loginDto: LoginDto) {
      
        // O 'loginDto' é validado pelo ValidationPipe em main.ts; se chegar aqui, o LocalStrategy validou o usuário e o anexou ao 'req.user'
        return this.authService.login(req.user);
    }
}
