import { Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Controller('auth')
export class AuthController {
    // Nest Js Handles internally and give the instance I don't care how it instantiate Just it gives the instance 
    constructor(private authService:AuthService){}
    @Post("signup")
    // Remember NestJs uses Express Js under the hood , 
    signup(@Req() req: Request){
        console.log(req)
        this.authService.signup()
    }

    @Post("signin")
    signin(){
        this.authService.signIn();
    }
}
