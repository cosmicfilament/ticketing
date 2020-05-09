'use strict';

/**
  * @module current-user.ts
  * @author John Butler
  * @description 
*/
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express{
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  // is user logged in ? set current user from jwt payload on req.currentUser : else nothing
  if(!req.session?.jwt){
    return next();
  }
  try{
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  }catch(error){
  }
  next();
};
