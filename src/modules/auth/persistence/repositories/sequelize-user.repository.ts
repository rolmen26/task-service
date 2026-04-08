import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRepositoryContract } from '../../contracts/user-repository.contract';
import { UserDomain } from '../../entity/user.domain';
import { UserPersistenceEntity } from '../../entity/persistence/user.persistence.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class SequelizeUserRepository implements UserRepositoryContract {
  constructor(
    @InjectModel(UserPersistenceEntity)
    private readonly userEntity: typeof UserPersistenceEntity,
  ) {}

  async findByEmail(email: string): Promise<UserDomain | null> {
    const user = await this.userEntity.findOne({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }
}
