import type { Request, Response, NextFunction } from 'express';
import type { ZodObject, ZodRawShape, z } from 'zod';

/**
 * 파라미터(`req.params`)의 유효성을 검사하고,
 * 검증된 데이터를 `req.parsedParams`에 추가하는 미들웨어를 생성합니다.
 * @param schema - 검증에 사용할 Zod 스키마.
 */
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

/**
 * 쿼리 스트링(`req.query`)의 유효성을 검사하고,
 * 검증된 데이터를 `req.parsedQuery`에 추가하는 미들웨어를 생성합니다.
 * @param schema - 검증에 사용할 Zod 스키마.
 */
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

/**
 * 요청 바디(`req.body`)의 유효성을 검사하고,
 * 검증된 데이터를 `req.parsedBody`에 추가하는 미들웨어를 생성합니다.
 * @param schema - 검증에 사용할 Zod 스키마.
 */
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
