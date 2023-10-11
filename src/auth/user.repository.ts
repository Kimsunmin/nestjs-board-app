import { CustomRepository } from "src/typeorm/typeorm-ex.decorator";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { BadRequestException, ConflictException, InternalServerErrorException } from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const user = this.create({username, password});
        try{
            await this.save(user);
        } catch(error) {
            if(error.code === '23505'){
                throw new ConflictException(`Existing username`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}