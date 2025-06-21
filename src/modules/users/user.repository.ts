import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UserRepository {
  constructor(@Inject('PG_CLIENT') private readonly pgClient: Pool) {}

  async findUserById(id: number) {
    const user = await this.pgClient.query(
      'SELECT id, first_name, last_name, age, email, role_id  FROM users WHERE id = $1',
      [id],
    );
    return user.rows[0];
  }

  async findUserByEmail(email: string) {
    const user = await this.pgClient.query(
      'SELECT id, first_name, last_name, age, email, role_id  FROM users WHERE email = $1',
      [email],
    );
    return user.rows[0];
  }

  async getUsers(
    limit: number,
    page: number,
    firstName?: string,
    lastName?: string,
    age?: number,
  ) {
    const safePageValue = page > 0 ? page : 1;
    const offset = (safePageValue - 1) * limit;
    const conditions: string[] = [];
    const values: (string | number)[] = [];
    if (firstName) {
      values.push(`%${firstName}%`);
      conditions.push(`first_name ILIKE $${values.length}`);
    }
    if (lastName) {
      values.push(`%${lastName}%`);
      conditions.push(`last_name ILIKE $${values.length}`);
    }
    if (age !== undefined) {
      values.push(age);
      conditions.push(`age = $${values.length}`);
    }
    const whereCondition = conditions.length
      ? `WHERE ${conditions.join(' AND ')}`
      : '';
    const totalUsers = await this.pgClient.query(
      `SELECT count(*) FROM users ${whereCondition}`,
      values,
    );
    const totalCount = totalUsers.rows[0].count;
    values.push(limit);
    values.push(offset);
    const query = `SELECT first_name, last_name, age, email, role_id FROM users ${whereCondition} LIMIT $${values.length - 1} OFFSET $${values.length}`;
    const users = await this.pgClient.query(query, values);
    return {
      users: users.rows,
      page: page,
      limit: limit,
      total: totalCount,
    };
  }
}
