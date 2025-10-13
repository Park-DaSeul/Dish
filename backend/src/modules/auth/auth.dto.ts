import { z } from 'zod';
import type { ValidatedRequest } from '../../middlewares/validate.middleware.js';
import { validateBody } from '../../middlewares/validate.middleware.js';

// ----------
// |  TYPE  |
// ----------

// 회원가입
export interface SignupRequest extends ValidatedRequest {
  parsedBody: CreateSignupData;
}

export interface CreateSignupData {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

// -----------------
// |  ZOD SCHEMAS  |
// -----------------

// auth
export const nameSchema = z
  .string()
  .min(1, '이름은 최소 1글자 이상이어야 합니다.')
  .max(100, '이름은 최대 100글자까지 가능합니다.');
export const nicknameSchema = z
  .string()
  .min(1, '닉네임은 최소 1글자 이상이어야 합니다.')
  .max(20, '닉네임은 최대 20글자까지 가능합니다.');
export const emailSchema = z.email('올바른 이메일 형식이 아닙니다.');
export const passwordSchema = z
  .string()
  .min(6, '비밀번호는 최소 6자리 이상이어야 합니다.')
  .max(20, '비밀번호는 최대 20자리까지 가능합니다.');

// 회원가입
export const signup = z
  .object({
    name: nameSchema,
    nickname: nicknameSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

// 로그인
export const login = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();

// 토큰 재발급
export const refresh = z.object({}).strict();

// ----------------
// |  VALIDATORS  |
// ----------------

// 회원가입
export const validateSignupBody = validateBody(signup);

// 로그인
export const validateloginBody = validateBody(login);

// 토큰 재발급
export const validateRefreshBody = validateBody(refresh);
