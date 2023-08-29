import { Controller, Get } from '@nestjs/common';

@Controller('boards2')
export class Boards2Controller {

    @Get()
    getAllBoards() {
        return 'getAllBoards';
    }

}
