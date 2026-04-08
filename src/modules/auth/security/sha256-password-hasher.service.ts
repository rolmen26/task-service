import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { PasswordHasherContract } from '../contracts/password-hasher.contract';

@Injectable()
export class Sha256PasswordHasherService implements PasswordHasherContract {
  compare(plainPassword: string, passwordHash: string): boolean {
    const hash = createHash('sha256').update(plainPassword).digest('hex');
    return hash === passwordHash;
  }
}
