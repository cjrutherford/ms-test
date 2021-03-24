import { Injectable } from '@nestjs/common';
import mysql, { PoolConnection } from 'mysql';
import { ConfigService } from 'src/config/config.service';
import { promisify } from 'util';
import MessageData from 'src/message-data.class';
import AwaitPool from 'src/awaitPool.class';

@Injectable()
export class MysqlService {
  pools: Map<string, AwaitPool> = new Map<string, AwaitPool>();
  constructor(private readonly configService: ConfigService) {
    for (let key of Object.keys(this.configService.database)) {
      const promisedPool: AwaitPool = new AwaitPool(
        mysql.createPool(configService.database[key]),
      );
      this.pools.set(key, promisedPool);
    }
  }

  public async query(data: MessageData) {
    const { sql, params, databaseConfigs } = data;
    for (let config of databaseConfigs) {
      try {
        const pool = this.pools.get(config);
        const connection: PoolConnection = await pool.getConnection();
        const result = !!params
          ? await connection.query(sql, params)
          : await connection.query(sql);
        return result;
      } catch (e) {
        console.error(e);
      }
    }
  }

  public async nonQuery(data: MessageData) {}
}
