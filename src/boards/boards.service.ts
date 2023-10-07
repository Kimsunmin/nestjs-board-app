import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardRepository) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find()
    }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }
    
    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where: {id}});

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        console.log(result);
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);
        found.status = status;
        const result = await this.boardRepository.save(found);
        return result;
    }
}
 