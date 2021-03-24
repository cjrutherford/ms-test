import { Pool, PoolConnection } from 'mysql';

class AwaitPool {
  raw: Pool;
  getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.raw.getConnection((err, connection) => {
        if (err) reject(err);
        resolve(connection);
      });
    });
  }
  constructor(_pool: Pool) {
    this.raw = _pool;
  }
}

export default AwaitPool;
