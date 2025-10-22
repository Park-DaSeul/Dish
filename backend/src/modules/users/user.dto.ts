import { z } from 'zod';
import type { AuthenticatedRequest } from '../../middlewares/auth.middleware.js';
import type { OffsetQuery } from '../../common/index.js';

// ----------
// |  TYPE  |
// ----------

// 모든 사용자 조회
export interface GetUsersRequest extends AuthenticatedRequest {
  parsedQuery: OffsetQuery;
}

// 특정 사용자 조회
export interface GetUserByIdRequest extends AuthenticatedRequest {}

// 사용자 수정
export interface UpdateUserRequest extends AuthenticatedRequest {
  parsedBody: UpdateUserBody;
}

// export interface UpdateUserData {
//   name: string;
//   nickname: string;
//   password: string;
//   newPassword?: string;
// }

// 사용자 삭제
export interface DeleteUserRequest extends AuthenticatedRequest {
  parsedBody: DeleteUserBody;
}

// -----------------
// |  ZOD SCHEMAS  |
// -----------------

// user
export const nameSchema = z
  .string()
  .min(1, '이름은 최소 1글자 이상이어야 합니다.')
  .max(20, '이름은 최대 20글자까지 가능합니다.');
export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
  .max(20, '닉네임은 최대 20글자까지 가능합니다.');
export const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  .max(20, '비밀번호는 최대 20자리까지 가능합니다.');

// 사용자 수정
export const updateUser = z
  .object({
    name: nameSchema,
    nickname: nicknameSchema,
    password: passwordSchema.optional(),
    newPassword: passwordSchema.optional(),
  })
  .strict();

export type UpdateUserBody = z.infer<typeof updateUser>;

// 사용자 삭제
export const deleteUser = z
  .object({
    password: passwordSchema,
  })
  .strict();

export type DeleteUserBody = z.infer<typeof deleteUser>;
