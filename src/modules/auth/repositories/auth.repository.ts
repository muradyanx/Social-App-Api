import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { UserInterface } from '@common/interface/user.interface';

@Injectable()
export class AuthRepository {
  constructor(@Inject('PG_CLIENT') private readonly pgClient: Pool) {}

  async createUser(
    user: UserInterface,
    password: string,
    roleId: number,
    securityStamp: string,
  ) {
    const { firstName, lastName, email, age } = user;
    return await this.pgClient.query(
      `
  INSERT INTO users (first_name, last_name, email, age, password, role_id, security_stamp)
  VALUES  ($1, $2, $3, $4, $5, $6, $7)
    `,
      [firstName, lastName, email, age, password, roleId, securityStamp],
    );
  }

  async updateSecurityStamp(email: string, securityStamp: string) {
    return await this.pgClient.query(
      `
    UPDATE users
    SET security_stamp = $1
    WHERE email = $2
  `,
      [securityStamp, email],
    );
  }
}
