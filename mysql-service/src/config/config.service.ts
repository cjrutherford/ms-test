import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { PoolConfig } from 'mysql';

export class PoolConfigStore {
  [key: string]: PoolConfig;
}

@Injectable()
export class ConfigService {
  database: PoolConfigStore;
  constructor() {
    this.database = JSON.parse(
      readFileSync('./configs.json', { encoding: 'utf-8' }),
    ) as PoolConfigStore;
  }
}
