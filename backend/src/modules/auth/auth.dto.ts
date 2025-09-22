import { z } from 'zod';
import { nameSchema, nicknameSchema, passwordSchema, emailSchema } from '../../common/index.js';

export interface CreateSignupData {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RefreshData {
  refreshToken: string;
}

// 회원가입 (body)
export const signup = {
  body: z
    .object({
      name: nameSchema,
      nickname: nicknameSchema,
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
};

// 로그인 (body)
export const login = {
  body: z
    .object({
      email: emailSchema,
      password: passwordSchema,
    })
    .strict(),
};

// 토큰 재발급 (body)
export const refresh = {
  body: z.object({}).strict(),
};
