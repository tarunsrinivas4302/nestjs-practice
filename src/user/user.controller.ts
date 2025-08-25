import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    @Get('me')
    // @UseGuards(AuthGuard('jwt'))
    getMe(){
        return 'user info'
    }
}
