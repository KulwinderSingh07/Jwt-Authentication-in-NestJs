import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { User } from 'src/schema/auth.schema';
import { Authdto } from './dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel("Users") private UserModel:Model<User>,private jwtservice:JwtService){}

   async getToken(userId:string,email:string){
    const access_token=await this.jwtservice.signAsync({
        sub:userId,
        email
    },{
        secret:'token_secret_key',
        expiresIn:60*15,
    })
    const refresh_token= await this.jwtservice.signAsync({
        sub:userId,
        email
    },{
        secret:'refresh_token_secret_key',
        expiresIn:60*60*24*7,
    })

    return {
        access_token,
        refresh_token
    }

    }

    async updateHash(userId:string,rt:string){
        const hash=await bcrypt.hash(rt,10)
        await this.UserModel.findByIdAndUpdate(userId,
            {
                hashref:hash
            }) 
    }
   async signup(dto:Authdto){
    const hash=await bcrypt.hash(dto.password,10)
        const Userdocument=await this.UserModel.create({
            email:dto.email,
            hash
        })
        
        const tokens=await this.getToken(Userdocument.id,Userdocument.email)
        await this.updateHash(Userdocument.id,tokens.refresh_token)
        return tokens
    }

    async login(dto:Authdto){
        // console.log(dto)
        const Userdocument=await this.UserModel.findOne({email:dto.email})
        if(!Userdocument) throw new ForbiddenException("Access denied")

        const passwordchecker=await bcrypt.compare(dto.password,Userdocument.hash);
        if(!passwordchecker) throw new ForbiddenException("Access Denied")

        const token=await this.getToken(Userdocument.id,Userdocument.email);

        await this.updateHash(Userdocument.id,token.refresh_token)
        return token

    }

    async logout(userId:string){
        await this.UserModel.findByIdAndUpdate(userId,{
            hashref:null
        })
        return{
            deleted:true
        }
    }

    async refreshtoken(userId:number,rt:string){
        const user=await this.UserModel.findById(userId)
        if(!user) throw new ForbiddenException("Access denied")
        const token=await this.getToken(user.id,user.email)
        await this.updateHash(user.id,token.refresh_token)
        return token

    }



}
