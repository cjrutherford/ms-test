import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HELLO_SERVICE') private helloClient: ClientProxy,
  ) {}

  @Get('hello/:name')
  getHello(@Param('name') name = 'there') {
    return this.helloClient.send({ cmd: 'hello' }, name);
  }
}
