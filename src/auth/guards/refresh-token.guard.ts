import { AuthGuard } from "@nestjs/passport";

export class RefreshToeknGuard extends AuthGuard('jwt-refresh'){
    constructor(){
        super({})
    }

}