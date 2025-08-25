import { ForbiddenException, Injectable } from '@nestjs/common';
// import { User , BookMark as Bookmark } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService , private jwt : JwtService , private config : ConfigService) { }
    async signup(dto: AuthDTO) {
        try {
            // hash the password
            const hashpassword = await argon.hash(dto.password);
            // save the user in db
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashpassword
                },
            })

            // Exclude password from the returned user object
            // const { password, ...userWithoutPassword } = user;
            // return userWithoutPassword;
            return this.signToken(user.id , user.email)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // which defines the violation of unique field insertion in prisma 
                if (error.code === "P2002") {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }

    async signIn(dto: AuthDTO) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (!user) throw new ForbiddenException('Credentials Incorrect')

            // Compare Passwords

            const passwordMatches = argon.verify(user.password, dto.password)
            if (!passwordMatches) throw new ForbiddenException("Credentials Taken")

            const { password, ...userWithoutPassword } = user;
            // return userWithoutPassword;
            return this.signToken(user.id , user.email)
        } catch (error) {
            console.log(error)
        }
    }

    signToken(userId : number ,  email : string) : Promise<string>{
        const payload = {
            sub : userId, 
            email
        }

        return this.jwt.signAsync(payload , {
            expiresIn : '15m',
            secret  : this.config.get("JWT_SECRET")
        })
    }
}
