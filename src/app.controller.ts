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
    let message = new OrderEvent(`Order created.`, Math.round(Math.random() * 100));
    this.client.emit<any>('order_created', message);
    return message;
  }
}