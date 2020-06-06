import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { OrderEvent } from './events/order.event';

@Controller()
export class AppController {
  
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) { }
  
  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello() {
   this.client.emit<any>('order_created', new OrderEvent(`Order created. Id ${Math.round(Math.random() * 100)}`));
   return 'Hello World printed';
  }
}