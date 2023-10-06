import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoard: CreateBoardDto): Promise<Board> {
        const { title, description } = createBoard;

        const board = this.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
        })
        
        await this.save(board);
        return board;
    }
}