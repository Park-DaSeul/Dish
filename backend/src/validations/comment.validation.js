import { z } from 'zod';

// 공통 id, title, description, imageUrl (중복 제거)
const idSchema = z.uuid('UUID 형식이어야 합니다.');
const userIdSchema = z.uuid('유효한 사용자 ID를 입력하세요.');
const dishIdSchema = z.uuid('유효한 게시물 ID를 입력하세요.');
const contentShema = z
  .string()
  .min(1, '댓글은 최소 1글자 이상이어야 합니다.')
  .max(600, '댓은 최대 500글자까지 가능합니다.');

// 모든 댓글 조회 (query + params)
export const getComments = {
  params: z
    .object({
      dishId: dishIdSchema,
    })
    .strict(),
  query: z
    .object({
      page: z.coerce.number().min(1).max(1000).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    })
    .strict(),
};

// 특정 댓글 조회 (params)
export const getCommentById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 댓글 생성 (body + params)
export const createComment = {
  params: z
    .object({
      dishId: dishIdSchema,
    })
    .strict(),
  body: z
    .object({
      content: contentShema,
    })
    .strict(),
};

// 댓글 수정 (body + params)
export const updateComment = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      content: contentShema.optional(),
    })
    .strict(),
};

// 댓글 삭제 (params)
export const deleteComment = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};
