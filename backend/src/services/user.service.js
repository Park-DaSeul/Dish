import prisma from '../utils/prisma.js';
import jwt from 'jsonwebtoken';
import {
  getOneByIdOrFail,
  getUserByEmailOrFail,
  verifyPassword,
  hashPassword,
} from '../utils';

// 공통 select (중복 제거)
const userSelect = {
  id: true,
  name: true,
  nickname: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

// 모든 유저 조회
export const getUsers = async () => {
  const users = await prisma.user.findMany({
    select: userSelect,
  });
  return users;
};

// 특정 유저 조회
export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
  });
  if (!user) throw new Error('사용자를 찾을 수 없습니다.');
  return user;
};

// 유저 생성 (회원가입)
export const createUser = async (data) => {
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

// 유저 수정
export const updateUser = async (id, data) => {
  const { name, nickname, password, newPassword } = data;
  const userData = await getOneByIdOrFail(prisma.user, id, '사용자');
  await verifyPassword(password, userData.password);

  const updateData = {
    ...(name && { name }),
    ...(nickname && { nickname }),
    // 비밀번호 해시 처리
    ...(newPassword && { password: await hashPassword(newPassword) }),
  };

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: userSelect,
  });
  return user;
};

// 유저 삭제
export const deleteUser = async (id, data) => {
  const { password } = data;
  const userData = await getOneByIdOrFail(prisma.user, id, '사용자');
  await verifyPassword(password, userData.password);

  await prisma.user.delete({
    where: { id },
  });
};

// 로그인
export const loginUser = async (email, password) => {
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
