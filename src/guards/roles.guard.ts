
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/dtos/login.dto";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { UserType } from "src/user/enums/user-role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const {authorization} = context.switchToHttp().getRequest().headers;

    const loginPayload: JwtPayload | undefined =await this.jwtService
      .verifyAsync(authorization.split(" ")[1], {secret: process.env.JWT_SECRET})
      .catch(err => {
        console.log("🚀 ~ file: roles.guard.ts:23 ~ RolesGuard ~ canActivate ~ err", err);
        return undefined;
      });

    if(!loginPayload) {
      return false;
    }

    if(!authorization) {
      return false;
    }
   
    return requiredRoles.some((role) => role === loginPayload.typeUser);
  }
}