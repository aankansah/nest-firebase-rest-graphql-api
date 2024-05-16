import { Injectable, NestMiddleware, Inject, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import * as firebaseAdmin from 'firebase-admin'; 

@Injectable()
export class AuthGuard  implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('FIREBASE_APP') private firebaseApp: firebaseAdmin.app.App
  ) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const idToken = context.getArgs()[0]?.headers?.authorization.split(" ")[1];
  
      const permissions = this.reflector.get<string[]>("permissions", context.getHandler());
        const claims = await this.firebaseApp.auth().verifyIdToken(idToken);
        const user = await this.firebaseApp.auth().getUser(claims.uid);

        if (user.customClaims['role'] === permissions[0]) {
            return true;
        }
        throw new UnauthorizedException();
    } catch (error) {
        console.log("Error", error);
        throw new UnauthorizedException();
    }
}
}
