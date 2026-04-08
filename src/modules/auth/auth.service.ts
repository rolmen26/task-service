import { Injectable } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginUserUseCase } from './use-cases/login-user.use-case';

@Injectable()
export class AuthService {
  constructor(private readonly loginUserUseCase: LoginUserUseCase) {}

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const result = await this.loginUserUseCase.execute(dto);

    return {
      ...result,
      message: 'Login successful',
    };
  }
}
