import prisma from '../../libs/prisma.js';
import type { CreateSignupData } from './auth.dto.js';

// 회원가입
export const signup = async (createData: CreateSignupData) => {
  const user = await prisma.user.create({
    data: createData,
    select: {
      id: true,
      name: true,
      nickname: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
};

// 이메일 중복 확인
export const checkUserExistsByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
};
