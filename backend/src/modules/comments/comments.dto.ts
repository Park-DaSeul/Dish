import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { idSchema, dishIdSchema, contentShema, limitSchema, pageSchema } from '../../common/validations.js';

export interface GetCommentsQuery {
  cursor?: string;
  limit?: number;
  search?: string;
}

export interface GetCommentsRepositoryQuery {
  where: Prisma.CommentWhereInput;
  take: number;
  cursor?: Prisma.CommentWhereUniqueInput;
  orderBy: Prisma.CommentOrderByWithRelationInput;
  skip: number;
}

export interface CreateCommentData {
  content: string;
}

export interface CreateCommentRepositoryData extends CreateCommentData {
  dishId: string;
  userId: string;
}

export interface UpdateCommentData {
  content: string;
}

// 모든 댓글 조회 (특정요리) (query + params)
export const getComments = {
  query: z
    .object({
      page: pageSchema,
      limit: limitSchema,
    })
    .strict(),
  params: z
    .object({
      dishId: dishIdSchema,
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

// 댓글 생성 (params + body)
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

// 댓글 수정 (params + body)
export const updateComment = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      content: contentShema,
    })
    .partial()
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
