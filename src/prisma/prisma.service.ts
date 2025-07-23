import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources : {
                db : {
                    url : process.env.DATABASE_URL || 'postgresql://tarunsrinivas:taRun4302@localhost:5434/bookmark_db?schema=public'
                }
            }
        })
    }
}
