import  * as fs from 'fs';
import * as path from 'path';
import * as process from 'node:process';

const MIGRATIONS_DIR = 'src/database/migrations';

const name = process.argv[2];
if (!name) {
  console.error('Missing the migration name');
  process.exit(1);
}

const timestamp = Date.now();
const fileName = `${timestamp}-${name}.ts`;
const filePath = path.join(MIGRATIONS_DIR, fileName);

const tamplate = `
  import { MigrationBuilder } from 'node-pg-migrate';

 export const up = (pgm: MigrationBuilder) => {
  // TODO: Write your migration here
  };
  
  export const down = (pgm: MigrationBuilder) => {
  // TODO: write your rollback here
  };
  `;

fs.mkdirSync(MIGRATIONS_DIR, { recursive: true });
fs.writeFileSync(filePath, tamplate);

console.log(`Created migration: ${fileName}`);