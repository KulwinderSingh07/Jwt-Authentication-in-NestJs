import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authdto } from './dto';
import { Token } from './token';
import { AuthGuard } from '@nestjs/passport';
import { AccessToeknGuard, RefreshToeknGuard } from './guards';
import { GetCurrentUserId, Getcurrentuser } from './decorators';

@Controller('auth')
export class AuthController {
    constructor(private authservice:AuthService){}

    @HttpCode(HttpStatus.CREATED)
    @Post("/signup")
    Signup(@Body() dto:Authdto):Promise<Token>{
        return this.authservice.signup(dto)

    }

    @HttpCode(HttpStatus.OK)
    @Post("/signin")
    Login(@Body() dto:Authdto):Promise<Token>{
        // console.log(dto)
        return this.authservice.login(dto)

    }

    @UseGuards((AccessToeknGuard))
    @Post('logout')
    Logout(@GetCurrentUserId() userId:string){
        return this.authservice.logout(userId)
    }

    @UseGuards(RefreshToeknGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshtoken(@GetCurrentUserId() userId:number,@Getcurrentuser('refreshToken') refreshtoken:string)
    {
        return this.authservice.refreshtoken(userId,refreshtoken)
    }
}
