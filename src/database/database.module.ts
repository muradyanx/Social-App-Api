import { Module } from '@nestjs/common';
import { pgClientProvider } from './postgres.provider';

@Module({
  providers: [pgClientProvider],
  exports: [pgClientProvider],
})
export class DatabaseModule {}
