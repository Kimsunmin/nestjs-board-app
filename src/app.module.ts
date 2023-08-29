import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { Boards2Module } from './boards2/boards2.module';

@Module({
  imports: [BoardsModule, Boards2Module],
})
export class AppModule {}
