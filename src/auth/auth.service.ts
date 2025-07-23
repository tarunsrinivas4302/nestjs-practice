import { Injectable } from '@nestjs/common';
import { User , BookMark as Bookmark } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma:PrismaService){}
    signup() {
        return {msg : "Hello This is signup"}    
    }

    signIn() {
        return {msg : "Hello This is signIn"}    

    }
}
