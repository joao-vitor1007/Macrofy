import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DietController } from './diet/diet.controller';

@Module({
  imports: [],
  controllers: [AppController, DietController],
  providers: [AppService],
})
export class AppModule {}
