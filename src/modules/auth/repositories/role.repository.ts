import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class RoleRepository {
  constructor(@Inject('PG_CLIENT') private readonly pgClient: Pool) {}
  async findRoleByName(name: string) {
    const role = await this.pgClient.query(
      'SELECT * FROM roles WHERE role_name = $1',
      [name],
    );
    if (role.rows[0]) {
      return role.rows[0];
    }
    return null;
  }
}
