import passport from '../libs/passport/index.js';
import type { Request, Response, NextFunction } from 'express';
import type { User } from '@prisma/client';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('access-token', { session: false }, (err: Error, user: User | false, _info: object) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }
    req.user = user;
    next();
  })(req, res, next);
};
