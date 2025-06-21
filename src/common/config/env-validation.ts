import 'dotenv/config';

export const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env value ${name}`);
  }
  return value;
};
