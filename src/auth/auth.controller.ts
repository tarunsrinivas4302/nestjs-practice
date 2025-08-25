import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller('auth')
export class AuthController {
    // * Nest Js Handles internally and give the instance I don't care how it instantiate Just it gives the instance 
    constructor(private authService: AuthService) { }

    @Post("signup")
    signup(@Body() dto: AuthDTO) {
        return this.authService.signup(dto)
    }

    @Post("signin")
    signin(@Body() dto : AuthDTO) {
        return this.authService.signIn(dto);
    }
}
