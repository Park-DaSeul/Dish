import prisma from '../utils/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 공통 select (중복 제거)
const userSelect = {
  id: true,
  name: true,
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
  return user;
};

// 유저 생성 (회원가입)
export const createUser = async (data) => {
  const { name, email, password } = data;

  // 비밀번호 해시 처리
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: userSelect,
  });
  return user;
};

// 유저 수정
export const updateUser = async (id, data) => {
  const { name, password, newPassword } = data;
  await verifyPasswordById(id, password);

  const updateData = {
    ...(name && { name }),
    // 비밀번호 해시 처리
    ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
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
  await verifyPasswordById(id, password);

  await prisma.user.delete({
    where: { id },
  });
};

// 로그인
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  // JWT 토큰 생성
  const token = jwt.sign(
    { id: user.id, email: user.email }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }, // 만료시간
  );

  return { user: { id: user.id, name: user.name, email: user.email }, token };
};

// password 확인하는 헬퍼 함수
async function verifyPasswordById(id, password) {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
}
