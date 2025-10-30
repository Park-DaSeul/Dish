import type { Request, Response, NextFunction } from 'express';
import type { ZodObject, ZodRawShape, z } from 'zod';

// parmas
export const validateParams =
  <T extends ZodObject<ZodRawShape>>(schema: T) =>
  // 이전 미들웨어의 req 타입을 유지하기 위해 제네릭 TReq를 사용합니다.
  <TReq extends Request>(req: TReq, _res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = schema.safeParse(req.params);
      if (!success) {
        // Zod 에러를 중앙 에러 핸들러로 넘깁니다.
        return next(error);
      }

      // 기존 req 타입에 `parsedParams` 속성을 추가하여 타입을 확장합니다.
      (req as TReq & { parsedParams: z.infer<T> }).parsedParams = data;
      return next();
    } catch (err) {
      return next(err);
    }
  };

// query
export const validateQuery =
  <T extends ZodObject<ZodRawShape>>(schema: T) =>
  <TReq extends Request>(req: TReq, _res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = schema.safeParse(req.query);
      if (!success) {
        return next(error);
      }

      (req as TReq & { parsedQuery: z.infer<T> }).parsedQuery = data;
      return next();
    } catch (err) {
      return next(err);
    }
  };

// body
export const validateBody =
  <T extends ZodObject<ZodRawShape>>(schema: T) =>
  <TReq extends Request>(req: TReq, _res: Response, next: NextFunction) => {
    try {
      const { success, data, error } = schema.safeParse(req.body);
      if (!success) {
        return next(error);
      }

      (req as TReq & { parsedBody: z.infer<T> }).parsedBody = data;
      return next();
    } catch (err) {
      return next(err);
    }
  };
