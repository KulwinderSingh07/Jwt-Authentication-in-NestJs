import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authdto } from './dto';
import { Token } from './token';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @Post("/signup")
    Signup(@Body() dto:Authdto):Promise<Token>{
        return this.authservice.signup(dto)

    }

    @Post("/signin")
    Login(@Body() dto:Authdto):Promise<Token>{
        console.log(dto)
        return this.authservice.login(dto)

    }

    @Post("/logout")
    Logout(){
        return this.authservice.logout()

    }

    @Post("/refres-token")
    Refreshtoken(){
        return this.authservice.refreshtoken()

    }


}
