export const PASSWORD_HASHER = Symbol('PASSWORD_HASHER');

export interface PasswordHasherContract {
  compare(plainPassword: string, passwordHash: string): boolean;
}
