import passport from '../libs/passport/index.js';
import type { Request, Response, NextFunction } from 'express';
import type { User } from '@prisma/client';

/**
 * 인증 미들웨어를 통과한 요청을 나타내는 타입입니다.
 * 기본 Request 타입에 'user' 속성이 반드시 존재함을 보장합니다.
 */
export type AuthenticatedRequest = Request & {
  user: User;
};

// 인증
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('access-token', { session: false }, (err: Error, user: User | false, _info: object) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }
    (req as AuthenticatedRequest).user = user;
    next();
  })(req, res, next);
};

// 인증 optional
export const optionalAuthenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('access-token', { session: false }, (err: Error, user: User | false, _info: object) => {
    if (err) {
      return next(err);
    }
    if (user) {
      (req as AuthenticatedRequest).user = user;
    }
    next();
  })(req, res, next);
};

// 로그인
export const localAuthenticate = passport.authenticate('local', { session: false });

// 토큰 재발급
export const refreshTokenAuthenticate = passport.authenticate('refresh-token', { session: false });
