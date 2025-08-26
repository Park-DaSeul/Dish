import prisma from '../utils/prisma.js';
import jwt from 'jsonwebtoken';
import {
  getUserByEmailOrFail,
  verifyPassword,
  hashPassword,
  checkUserExistsByEmail,
  userSelect,
} from '../utils/index.js';

// 회원가입
export const signup = async (data) => {
  const { name, nickname, email, password } = data;

  // 이메일 중복 확인
  const existingUser = await checkUserExistsByEmail(email);
  if (existingUser) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  // 비밀번호 해시 처리
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      nickname,
      email,
      password: hashedPassword,
    },
    select: userSelect,
  });
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
