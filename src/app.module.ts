import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
@Module({
  imports: [
   ClientsModule.register([
    { name: 'ORDER_SERVICE', 
      transport: Transport.REDIS, 
      options: {
        url: 'redis://localhost:6379',
      }},
   ]),
 ],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {
}