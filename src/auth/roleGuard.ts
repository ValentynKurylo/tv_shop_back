import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLE_KEY} from "./roleAuthDecorator";

@Injectable()
export class roleGuards implements CanActivate{

    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if(!requiredRole){
                return false
            }
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException("Dont Allowed")
            }
            const user = this.jwtService.verify(token)
            req.user = user

            return requiredRole.includes(user.role)
        }
        catch (e){
            throw new UnauthorizedException("Dont Allowed")
        }
    }

}

