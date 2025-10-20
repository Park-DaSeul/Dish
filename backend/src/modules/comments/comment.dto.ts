import { z } from 'zod';
import { idSchema, dishIdSchema, cursorSchema } from '../../common/index.js';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
// import type { ValidatedRequest } from '../../middlewares/validate.middleware.js';
import type { ResourceWithRequest } from '../../middlewares/ownership.middleware.js';
import type { Comment } from '@prisma/client';

// ----------
// |  TYPE  |
// ----------

// 모든 댓글 조회 (특정요리)
export type GetCommentsRequest = AuthenticatedRequest & {
  parsedParams: GetCommentsParams;
  parsedQuery: GetCommentsQuery;
};

// export interface GetCommentsQuery {
//   limit?: number;
//   cursor?: string;
//   search?: string;
// }

// 특정 댓글 조회
export type GetCommentByIdRequest = AuthenticatedRequest & {
  parsedParams: IdCommentParams;
};

// 댓글 생성
export type CreateCommentRequest = AuthenticatedRequest & {
  parsedParams: CreateCommentParams;
  parsedBody: CreateCommentBody;
};

export interface CreateCommentData {
  content: string;
}

// 댓글 수정
export type UpdateCommentRequest = AuthenticatedRequest & {
  parsedParams: IdCommentParams;
  parsedBody: UpdateCommentBody;
  resource: Comment;
};

export interface UpdateCommentData {
  content: string;
}

// 댓글 삭제
export type DeleteCommentRequest = AuthenticatedRequest & {
  parsedParams: DeleteCommentParams;
};

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

// =================================================================
// NEW ZOD-BASED SCHEMAS AND TYPES FOR REFACTORING
// =================================================================

// 모든 댓글 조회 (특정요리)
export type GetCommentsParams = z.infer<typeof dishIdSchema>;

export type GetCommentsQuery = z.infer<typeof cursorSchema>;

// POST /dishes/:dishId/comments - 댓글 생성
export type CreateCommentParams = z.infer<typeof dishIdSchema>;

export type CreateCommentBody = z.infer<typeof createComment>;

// PUT /comments/:commentId - 댓글 수정
export type IdCommentParams = z.infer<typeof idSchema>;

export type UpdateCommentBody = z.infer<typeof updateComment>;

// DELETE /comments/:commentId - 댓글 삭제
export type DeleteCommentParams = z.infer<typeof idSchema>;
