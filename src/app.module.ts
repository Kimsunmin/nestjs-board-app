import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { Boards2Module } from './boards2/boards2.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    BoardsModule,
    Boards2Module,
    TypeOrmModule.forRoot(typeORMConfig)
  ],
})
export class AppModule {}
