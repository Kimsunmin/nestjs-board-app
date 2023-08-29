import { Injectable } from '@nestjs/common';
import { Board2, Board2Status } from './board2.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class Boards2Service {

    private boards2: Board2[] = [];

    getAllBoards2(): Board2[] {
        return this.boards2;
    }

    getBoard2ById(id: string): Board2 {
        return this.boards2.filter(a => a.id = id)[0];
    }

    createBoard2(title: string, context: string): Board2 {
        const board2: Board2 = {
            id : uuid(),
            title,
            context,
            status : Board2Status.public,
        }

        this.boards2.push(board2);
        
        return board2; 
    }

}
