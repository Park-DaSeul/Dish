import { z } from 'zod';
import { idSchema, dishIdSchema, contentShema, limitSchema, pageSchema } from '../utils/validations.js';

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
// export const getCommentById = {
//   params: z
//     .object({
//       id: idSchema,
//     })
//     .strict(),
// };

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
