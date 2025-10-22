import { z } from 'zod';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
import type { IdParams, DishIdParams, CursorQuery } from '../../common/index.js';
import type { Comment } from '@prisma/client';

// ----------
// |  TYPE  |
// ----------

// 모든 댓글 조회 (특정요리)
export interface GetCommentsRequest extends AuthenticatedRequest {
  parsedParams: DishIdParams;
  parsedQuery: CursorQuery;
}

// export interface GetCommentsQuery {
//   limit: number;
//   cursor?: string;
//   search?: string;
// }

// 특정 댓글 조회
export interface GetCommentByIdRequest extends AuthenticatedRequest {
  parsedParams: IdParams;
}

// 댓글 생성
export interface CreateCommentRequest extends AuthenticatedRequest {
  parsedParams: DishIdParams;
  parsedBody: CreateCommentBody;
}

// export interface CreateCommentData {
//   content: string;
// }

// 댓글 수정
export interface UpdateCommentRequest extends AuthenticatedRequest {
  parsedParams: IdParams;
  parsedBody: UpdateCommentBody;
  resource: Comment;
}

// export interface UpdateCommentData {
//   content: string;
// }

// 댓글 삭제
export interface DeleteCommentRequest extends AuthenticatedRequest {
  parsedParams: IdParams;
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

export type CreateCommentBody = z.infer<typeof createComment>;

// 댓글 수정
export const updateComment = createComment;

export type UpdateCommentBody = z.infer<typeof updateComment>;
