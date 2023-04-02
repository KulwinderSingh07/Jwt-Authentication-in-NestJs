import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenstrategy extends PassportStrategy(Strategy,'jwt-refresh'){
    constructor(){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'refresh_token_secret_key',
            passReqtoCallback:true
        })
    }
    validate(req:Request,payload:any){
        const refreshToken=req.get('authorization').replace('Bearer','').trim();
        return {
            ...payload,
            refreshToken
        }
    }
}