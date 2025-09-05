import prisma from '../utils/prisma.js';
import { getOneByIdOrFail, ingredientSelect } from '../utils/index.js';

// 모든 재료 조회 (특정요리)
export const getIngredients = async (dishId) => {
  const ingredients = await prisma.ingredient.findMany({
    where: { dishId },
    orderBy: {
      stepNumber: 'asc',
    },
    select: ingredientSelect,
  });

  return ingredients;
};

// 특정 재료 조회
export const getIngredientById = async (id) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: { id },
  });
  if (!ingredient) throw new Error('재료를 찾을 수 없습니다.');
  return ingredient;
};

// 재료 생성
export const createIngredient = async (dishId, userId, data) => {
  const { name } = data;

  const ingredient = await prisma.ingredient.create({
    data: {
      name,
      dishId,
    },
    select: ingredientSelect,
  });
  return ingredient;
};

// 재료 수정
export const updateIngredient = async (id, data) => {
  const { name } = data;
  await getOneByIdOrFail(prisma.ingredient, id, '재료');

  const ingredient = await prisma.ingredient.update({
    where: { id },
    data: { name },
  });
  return ingredient;
};

// 재료 삭제
export const deleteIngredient = async (id) => {
  await getOneByIdOrFail(prisma.ingredient, id, '재료');
  await prisma.ingredient.delete({ where: { id } });
};
