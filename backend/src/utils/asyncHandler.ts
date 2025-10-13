import type { Request, Response, NextFunction, RequestHandler } from 'express';

export const asyncHandler = <T extends Request>(
  requestHandler: (req: T, res: Response, next: NextFunction) => Promise<any>,
): RequestHandler => {
  return async (req, res, next) => {
    try {
      await requestHandler(req as T, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// 비동기 컨트롤러 함수에서 발생하는 에러를 처리하는 고차 함수입니다.
// 컨트롤러 함수를 감싸서, Promise가 reject되거나 예외가 발생했을 때
// 에러를 잡아 Express의 `next()` 함수로 전달합니다.
// 이를 통해 모든 비동기 에러는 전역 에러 핸들러에서 처리됩니다.
// export const asyncHandler = (requestHandler: RequestHandler): RequestHandler => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await requestHandler(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   };
// };
