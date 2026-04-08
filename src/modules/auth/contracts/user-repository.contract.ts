import { UserDomain } from '../entity/user.domain';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryContract {
  findByEmail(email: string): Promise<UserDomain | null>;
}
