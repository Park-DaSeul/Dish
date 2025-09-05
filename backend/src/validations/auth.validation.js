import { z } from 'zod';
import { nameSchema, nicknameSchema, passwordSchema, emailSchema } from '../utils/validations.js';

// 회원가입 (body)
export const signup = {
  body: z
    .object({
      name: nameSchema,
      nickname: nicknameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: passwordSchema,
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
