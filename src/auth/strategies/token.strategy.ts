import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { type } from "os";
import { ExtractJwt, Strategy } from "passport-jwt";


type JwtPayload={
    sub:string,
    email:string
}
@Injectable()
export class Tokenstrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'token_secret_key'
        })
    }
    validate(payload:JwtPayload){
        console.log(payload)
        return payload
    }
}