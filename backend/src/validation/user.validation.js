import { z } from 'zod';

// 공통 id, name, password, email (중복 제거)
const idSchema = z.uuid('UUID 형식이어야 합니다.');
const nameSchema = z
  .string()
  .min(2, '이름은 최소 2글자 이상이어야 합니다.')
  .max(20, '이름은 최대 20글자까지 가능합니다.');
const nicknameSchema = z
  .string()
  .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
  .max(20, '닉네임은 최대 20글자까지 가능합니다.');
const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  .max(20, '비밀번호는 최대 20글자까지 가능합니다.');
const emailSchema = z.email('올바른 이메일 형식이 아닙니다.');

// 모든 유저 조회 (query)
export const getUsers = {
  query: z
    .object({
      page: z
        .string()
        .transform((val) => Number(val) || 1)
        .min(1)
        .max(1000)
        .optional(),
      limit: z
        .string()
        .transform((val) => Number(val) || 10)
        .min(1)
        .max(100)
        .optional(),
    })
    .strict(),
};

// 특정 유저 조회 (params)
export const getUserById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 유저 생성 (회원가입) (body)
export const createUser = {
  body: z
    .object({
      name: nameSchema,
      nickname: nicknameSchema,
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
};

// 유저 수정 (body + params)
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

// 유저 삭제 (params)
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

// 로그인 (body)
export const loginUser = {
  body: z
    .object({
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
};
