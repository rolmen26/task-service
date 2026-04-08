import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginResultContract } from '../contracts/login-result.contract';
import { PASSWORD_HASHER } from '../contracts/password-hasher.contract';
import type { PasswordHasherContract } from '../contracts/password-hasher.contract';
import { USER_REPOSITORY } from '../contracts/user-repository.contract';
import type { UserRepositoryContract } from '../contracts/user-repository.contract';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryContract,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasherContract,
  ) {}

  async execute(input: LoginDto): Promise<LoginResultContract> {
    if (!input.email || !input.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userRepository.findByEmail(input.email.trim());
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = this.passwordHasher.compare(
      input.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      email: user.email,
      name: user.name,
    };
  }
}
