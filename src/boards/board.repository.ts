import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { CreateBoardDto } from "./dto/create-board.dto";
import { BoardStatus } from "./board-status.enum";
import { User } from "src/auth/user.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
    async createBoard(createBoard: CreateBoardDto, user: User): Promise<Board> {
        const { title, description } = createBoard;

        const board = this.create({
            title: title,
            description: description,
            status: BoardStatus.PUBLIC,
            user: user,
        })
        
        await this.save(board);
        return board;
    }
}