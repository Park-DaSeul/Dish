import { z } from 'zod';
import type { ValidatedRequest } from '../../middlewares/validate.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';

// ----------
// |  TYPE  |
// ----------

// 모든 댓글 조회 (특정요리)
export interface GetCommentsRequest extends ValidatedRequest {
  parsedParams: {
    dishId: string;
  };
  parsedQuery: GetCommentsQuery;
}

export interface GetCommentsQuery {
  limit?: number;
  cursor?: string;
  search?: string;
}

// 특정 댓글 조회
export interface GetCommentByIdRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
}

// 댓글 생성
export interface CreateCommentRequest extends ValidatedRequest {
  parsedParams: {
    dishId: string;
  };
  parsedBody: CreateCommentData;
}

export interface CreateCommentData {
  content: string;
}

// 댓글 수정
export interface UpdateCommentRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
  parsedBody: UpdateCommentData;
}

export interface UpdateCommentData {
  content: string;
}

// 댓글 삭제
export interface DeleteCommentRequest extends ValidatedRequest {
  parsedParams: {
    id: string;
  };
}

// -----------------
// |  ZOD SCHEMAS  |
// -----------------

// comment
export const contentShema = z
  .string()
  .min(1, '댓글은 최소 1글자 이상이어야 합니다.')
  .max(500, '댓글은 최대 500글자까지 가능합니다.');

// 댓글 생성
export const createComment = z
  .object({
    content: contentShema,
  })
  .strict();

// 댓글 수정
export const updateComment = createComment;

// ----------------
// |  VALIDATORS  |
// ----------------

// 댓글 생성
export const validateCreateBody = validateBody(createComment);

// 댓글 수정
export const validateUpdateBody = validateBody(updateComment);
