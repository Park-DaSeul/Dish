import * as authRepository from './auth.repository.js';
import jwt from 'jsonwebtoken';
import { getUserByEmailOrFail, verifyPassword, hashPassword } from '../../common/index.js';

// 회원가입
export const signup = async (data) => {
  const { name, nickname, email, password, confirmPassword } = data;

  // 이메일 중복 확인
  const existingUser = await authRepository.checkUserExistsByEmail(email);
  if (existingUser) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  // 비밀번호 2번입력 같은지 확인
  if (password !== confirmPassword) {
    throw new Error('비밀번호가 일치하지 않습니다');
  }

  // 비밀번호 해시 처리
  const hashedPassword = await hashPassword(password);

  const createDate = {
    name,
    nickname,
    email,
    password: hashedPassword,
  };
  const user = await authRepository.signup(createDate);

  return user;
};

// 로그인
export const login = async (email, password) => {
  const user = await getUserByEmailOrFail(email);
  await verifyPassword(password, user.password);

  // JWT 토큰 생성
  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }, // 만료시간
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      nickname: user.nickname,
      email: user.email,
    },
    token,
  };
};
