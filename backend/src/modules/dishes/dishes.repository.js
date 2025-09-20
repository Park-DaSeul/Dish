import prisma from '../../libs/prisma.js';
import { dishSelect } from '../../common/index.js';

// 모든 요리 게시글 조회
export const getDishes = async (queryData) => {
  const dishes = await prisma.dish.findMany({
    ...queryData,
    select: dishSelect,
  });

  return dishes;
};

// 특정 요리 게시글 조회
export const getDishById = async (id) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    select: dishSelect,
  });

  return dish;
};

// 요리 게시글 생성
export const createDish = async (createData) => {
  const dish = await prisma.dish.create({
    data: createData,
    select: dishSelect,
  });

  return dish;
};

// 요리 게시글 수정
export const updateDish = async (id, updateData) => {
  const dish = await prisma.$transaction(async (tx) => {
    await tx.dishIngredient.deleteMany({ where: { dishId: id } });
    await tx.recipe.deleteMany({ where: { dishId: id } });

    return tx.dish.update({
      where: { id },
      data: updateData,
      select: dishSelect,
    });
  });

  return dish;
};

// 요리 게시글 삭제
export const deleteDish = async (id) => {
  return await prisma.dish.delete({
    where: { id },
  });
};

// 요리 게시글 존재 확인
export const findDish = async (id) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
  });

  return dish;
};
