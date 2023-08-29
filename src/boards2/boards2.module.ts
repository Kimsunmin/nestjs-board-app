import { Module } from '@nestjs/common';
import { Boards2Controller } from './boards2.controller';
import { Boards2Service } from './boards2.service';

@Module({
  controllers: [Boards2Controller],
  providers: [Boards2Service]
})
export class Boards2Module {}
