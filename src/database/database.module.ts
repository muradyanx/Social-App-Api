import { Global, Module } from '@nestjs/common';
import { pgClientProvider } from './postgres.provider';

@Global()
@Module({
  providers: [pgClientProvider],
  exports: [pgClientProvider],
})
export class DatabaseModule {}
