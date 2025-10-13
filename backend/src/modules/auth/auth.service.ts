import * as authRepository from './auth.repository.js';
import { hashPassword } from '../../common/index.js';
import { generateTokens } from '../../libs/token.js';
import type { Tokens } from '../../libs/token.js';
import type { CreateSignupData } from './auth.dto.js';
import type { Prisma } from '@prisma/client';

// 회원가입
export const signup = async (data: CreateSignupData) => {
  const { name, nickname, email, password } = data;

  // 이메일 중복 확인
  const existingUser = await authRepository.checkUserExistsByEmail(email);
  if (existingUser) throw new Error('이미 사용 중인 이메일입니다.');

  // 비밀번호 해시 처리
  const hashedPassword = await hashPassword(password);

  const createData: Prisma.UserCreateInput = {
    name,
    nickname,
    email,
    password: hashedPassword,
  };

  const user = await authRepository.signup(createData);

  return user;
};

// 로그인
export const login = (userId: string): Tokens => {
  return generateTokens(userId);
};

// 토큰 재발금
export const refresh = (userId: string): Tokens => {
  return generateTokens(userId);
};
