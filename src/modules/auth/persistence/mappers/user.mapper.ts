import { UserDomain } from '../../entity/user.domain';
import { UserPersistenceEntity } from '../../entity/persistence/user.persistence.entity';

export class UserMapper {
  static toDomain(user: UserPersistenceEntity): UserDomain {
    return new UserDomain({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
