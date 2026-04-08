import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PASSWORD_HASHER } from './contracts/password-hasher.contract';
import { USER_REPOSITORY } from './contracts/user-repository.contract';
import { UserPersistenceEntity } from './entity/persistence/user.persistence.entity';
import { SequelizeUserRepository } from './persistence/repositories/sequelize-user.repository';
import { JwtStrategy } from './security/jwt.strategy';
import { Sha256PasswordHasherService } from './security/sha256-password-hasher.service';
import { LoginUserUseCase } from './use-cases/login-user.use-case';

@Module({
  imports: [
    SequelizeModule.forFeature([UserPersistenceEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-key-for-now',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LoginUserUseCase,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: SequelizeUserRepository,
    },
    {
      provide: PASSWORD_HASHER,
      useClass: Sha256PasswordHasherService,
    },
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
