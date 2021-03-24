import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { MysqlService } from './mysql/mysql.service';
import MessageData from './message-data.class';

@Controller()
export class AppController {
  constructor(private readonly mysqlService: MysqlService) {}

  @MessagePattern({ cmd: 'query' })
  query(data: MessageData): any {
    return this.mysqlService.query(data);
  }

  @MessagePattern({cmd: 'nonQuery'})
  nonQuery(data: MessageData){
    return this.mysqlService.nonQuery(data);
  }

  // @MessagePattern({cmd: 'getEnabledDatabases'})
  // getEnabledDatabases(){
  //   return [];
  // }

  // @MessagePattern({cmd: 'applyMigration'})
}
