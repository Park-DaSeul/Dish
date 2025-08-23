import { z } from 'zod';

const content = z.string().min(1, '댓글 내용은 필수입니다.').max(500, '댓글은 500자를 초과할 수 없습니다.');

export const createComment = {
  body: z.object({
    content,
  }),
  params: z.object({
    dishId: z.string().uuid('유효한 게시물 ID가 아닙니다.'),
  }),
};

export const updateComment = {
  body: z.object({
    content,
  }),
  params: z.object({
    commentId: z.string().uuid('유효한 댓글 ID가 아닙니다.'),
  }),
};

export const deleteComment = {
  params: z.object({
    commentId: z.string().uuid('유효한 댓글 ID가 아닙니다.'),
  }),
};

export const getComments = {
  params: z.object({
    dishId: z.string().uuid('유효한 게시물 ID가 아닙니다.'),
  }),
};
