import type { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// Prisma Delegate 타입을 정의하여 prisma.dish 또는 prisma.comment와 같은 객체의 타입을 나타냅니다.
// findUnique 메소드를 포함해야 합니다.
interface PrismaDelegate {
  findUnique: (args: { where: { id: string } }) => Promise<any>;
  model?: { name: string }; // 모델 이름에 접근하기 위해 추가 (에러 메시지용)
}

export interface OwnershipRequest extends Request {
  user: { id: string };
  parsedParams: { id: string };
}

export interface ResourceExistsRequest extends Request {
  parsedParams: Record<string, string>;
}

export type ResourceWithRequest<T> = OwnershipRequest & { resource: T };

export const checkOwnership = <T extends { userId: string } & Record<string, any>>(
  delegate: PrismaDelegate,
  userFieldName = 'userId',
): RequestHandler<any, any, any, any, OwnershipRequest> => {
  return async (req, res, next) => {
    const typedReq = req as OwnershipRequest;

    const resourceId = typedReq.parsedParams.id;
    const userId = typedReq.user.id;

    if (!resourceId) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: '리소스 ID가 필요합니다.' });
    }

    try {
      const resource = (await delegate.findUnique({
        where: { id: resourceId },
      })) as T | null;

      if (!resource) {
        const modelName = delegate.model?.name || '리소스';
        return res.status(StatusCodes.NOT_FOUND).json({ message: `${modelName}을/를 찾을 수 없습니다` });
      }

      if (resource[userFieldName] !== userId) {
        return res.status(StatusCodes.FORBIDDEN).json({ message: '이 작업을 수행할 권한이 없습니다.' });
      }

      // 타입이 보장된 resource를 req 객체에 할당합니다.
      // RequestWithResource<T> 타입 덕분에 컨트롤러에서 타입을 정확히 추론할 수 있습니다.
      (req as ResourceWithRequest<T>).resource = resource;

      next();
    } catch (err) {
      next(err);
    }
  };
};

// 리소스의 존재 여부만 확인하는 미들웨어
export const checkResourceExists = (
  delegate: PrismaDelegate,
  paramId: string,
): RequestHandler<any, any, any, any, ResourceExistsRequest> => {
  return async (req, res, next) => {
    const typedReq = req as ResourceExistsRequest;
    // ValidatedRequest에서 parsedParams는 unknown 타입이므로, Record<string, string>으로 단언하여
    // 동적으로 paramName을 통해 접근 가능하게 합니다.

    const resourceId = typedReq.parsedParams[paramId];

    if (!resourceId) {
      // 400 Bad Request
      return res.status(StatusCodes.BAD_REQUEST).json({ message: `리소스 '${paramId}'가 필요합니다.` });
    }

    try {
      // resourceId는 string임을 보장합니다.
      const resource = await delegate.findUnique({
        where: { id: resourceId },
      });

      if (!resource) {
        // 404 Not Found
        const modelName = delegate.model?.name || '리소스';
        return res.status(StatusCodes.NOT_FOUND).json({ message: `${modelName}을/를 찾을 수 없습니다` });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

// export interface ValidatedIdRequest extends Request {
//   parsedParams?: {
//     id: string;
//   };
// }

// export interface ValidateDynamicIdRequest extends Request {
//   parsedParams?: Record<string, string>;
// }

// 제네릭을 사용하여 특정 리소스 타입을 가진 Request 객체의 타입을 정의합니다.
// export interface ResourceWithRequest<T> extends ValidatedIdRequest {
//   resource: T; // 이제 optional이 아니며, 미들웨어를 통과하면 항상 존재합니다.
// }

// 제네릭 <T>는 userId 속성을 가진 객체여야 함을 명시합니다.
// delegate 인자로는 prisma.dish 또는 prisma.comment와 같은 Prisma Delegate를 받습니다.
