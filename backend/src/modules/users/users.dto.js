import { z } from 'zod';
import { idSchema, nameSchema, nicknameSchema, passwordSchema } from '../../common/validations.js';

// 모든 사용자 조회 (query)
export const getUsers = {
  query: z
    .object({
      page: z.coerce.number().min(1).max(1000).default(1),
      limit: z.coerce.number().min(1).max(100).default(10),
    })
    .strict(),
};

// 특정 사용자 조회 (params)
export const getUserById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 사용자 수정 (params + body)
export const updateUser = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      name: nameSchema.optional(),
      nickname: nicknameSchema.optional(),
      newPassword: passwordSchema.optional(),
      password: passwordSchema,
    })
    .strict(),
};

// 사용자 삭제 (params + body)
export const deleteUser = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      password: passwordSchema,
    })
    .strict(),
};
