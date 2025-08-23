import prisma from '../utils/prisma.js';

// 공통 select (중복 제거)
const dishSelect = {
  id: true,
  title: true,
  description: true,
  imageUrl: true,
  createdAt: true,
  updatedAt: true,
};

// 모든 게시글 조회
export const getDishes = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const dishes = await prisma.dish.findMany({
    skip,
    take: limit,
    include: { user: true, comments: true, likes: true },
    orderBy: { createdAt: 'desc' },
  });
  return dishes;
};

// 특정 게시글 조회
export const getDishById = async (id) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    include: { user: true, comments: true, likes: true },
  });
  if (!dish) throw new Error('게시글을 찾을 수 없습니다.');
  return dish;
};

// 게시글 생성
export const createDish = async (data) => {
  const { title, description, imageUrl } = data;

  const dish = await prisma.dish.create({
    data: {
      title,
      description,
      imageUrl,
    },
    include: { user: true, comments: true, likes: true },
  });
  return dish;
};

// 게시글 수정
export const updateDish = async (id, data) => {
  const { title, description, imageUrl } = data;

  const updateData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(imageUrl && { imageUrl }),
  };

  const dish = await prisma.dish.update({
    where: { id },
    data: updateData,
    include: { user: true, comments: true, likes: true },
  });
  return dish;
};

// 게시글 삭제
export const deleteDish = async (id) => {
  await prisma.dish.delete({
    where: { id },
  });
};
