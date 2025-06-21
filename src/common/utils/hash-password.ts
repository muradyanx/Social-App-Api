import * as bcrypt from 'bcrypt';

const SALT_ROUND = 10;

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUND);
};

export const comparePassword = (
  newPassword: string,
  oldPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(newPassword, oldPassword);
};
