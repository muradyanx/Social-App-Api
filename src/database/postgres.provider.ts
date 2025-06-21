import { Pool } from 'pg';
import { config } from '@common/config';
import { DbInterface } from '@common/interface/db.interface';

const dbConnection: DbInterface = config.db;
export const pgClientProvider = {
  provide: 'PG_CLIENT',
  useFactory: async () => {
    const client = new Pool(dbConnection);
    await client.connect((err, client, release) => {
      if (err) {
        console.error('Failed connecting to PostgreSQL:', err);
        return;
      }
      console.log('Connected to PostgreSQL');
      release();
    });
    return client;
  },
};
