import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlService } from './mysql/mysql.service';
import { ConfigService } from './config/config.service';
import { ConfigService } from './config/config.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MysqlService, ConfigService],
})
export class AppModule {}
