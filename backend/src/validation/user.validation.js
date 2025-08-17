import { z } from 'zod';

// 공통 id, name, password, email (중복 제거)
const idSchema = z.uuid('UUID 형식이어야 합니다.');
const nameSchema = z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.');
const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.');
const emailSchema = z.email('올바른 이메일 형식이 아닙니다.');

// 모든 유저 조회 (query)
export const getUsers = {
  query: z.object({
    page: z
      .string()
      .transform((val) => Number(val) || 1)
      .optional(),
    limit: z
      .string()
      .transform((val) => Number(val) || 10)
      .optional(),
  }),
};

// 특정 유저 조회 (params)
export const getUserById = {
  params: z.object({
    id: idSchema,
  }),
};

// 유저 생성 (회원가입) (body)
export const createUser = {
  body: z.object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
};

// 유저 수정 (body + params)
export const updateUser = {
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    name: nameSchema.optional(),
    newPassword: passwordSchema.optional(),
    password: passwordSchema,
  }),
};

// 유저 삭제 (params)
export const deleteUser = {
  params: z.object({
    id: idSchema,
  }),
  body: z.object({
    password: passwordSchema,
  }),
};

// 로그인 (body)
export const loginUser = {
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
};
