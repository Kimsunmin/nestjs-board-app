import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { UpdateResult } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardRepository) {}

    async getAllBoards(user: User): Promise<Board[]> {
        return await 
            this.boardRepository.createQueryBuilder('board')
            .where('board.userId = :userId', { userId: user.id})
            .getMany();
    }

    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }
    
    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({where: {id}});

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({id, user: { id: user.id }});
        console.log(result);

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);
        found.status = status;
        const result = await this.boardRepository.save(found);
        return result;
    }
}
 