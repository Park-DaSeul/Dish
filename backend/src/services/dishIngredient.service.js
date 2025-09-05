import prisma from '../utils/prisma.js';
import { getOneByIdOrFail } from '../utils/index.js';

// 요리에 재료 추가
export const addIngredientToDish = async (userId, dishId, data) => {
  const { ingredientId, quantity, unit } = data;

  const dish = await getOneByIdOrFail(prisma.dish, dishId, '요리');
  if (dish.userId !== userId) {
    throw new Error('재료를 추가할 권한이 없습니다.');
  }

  await getOneByIdOrFail(prisma.ingredient, ingredientId, '재료');

  const dishIngredient = await prisma.dishIngredient.create({
    data: {
      dishId,
      ingredientId,
      quantity,
      unit,
    },
  });
  return dishIngredient;
};

// 특정 요리의 모든 재료 조회
export const getIngredientsOfDish = async (dishId) => {
  await getOneByIdOrFail(prisma.dish, dishId, '요리');
  const dishIngredients = await prisma.dishIngredient.findMany({
    where: { dishId },
    include: {
      ingredient: true,
    },
  });
  return dishIngredients;
};

// 요리의 특정 재료 수정
export const updateIngredientOfDish = async (userId, dishId, ingredientId, data) => {
  const { quantity, unit } = data;

  const dish = await getOneByIdOrFail(prisma.dish, dishId, '요리');
  if (dish.userId !== userId) {
    throw new Error('재료를 수정할 권한이 없습니다.');
  }

  await getOneByIdOrFail(prisma.dishIngredient, { dishId, ingredientId }, '요리 재료');

  const updateData = {
    ...(quantity && { quantity }),
    ...(unit && { unit }),
  };

  const dishIngredient = await prisma.dishIngredient.update({
    where: { 
      dishId_ingredientId: {
        dishId,
        ingredientId,
      }
     },
    data: updateData,
  });
  return dishIngredient;
};

// 요리에서 재료 삭제
export const removeIngredientFromDish = async (userId, dishId, ingredientId) => {
  const dish = await getOneByIdOrFail(prisma.dish, dishId, '요리');
  if (dish.userId !== userId) {
    throw new Error('재료를 삭제할 권한이 없습니다.');
  }

  await getOneByIdOrFail(prisma.dishIngredient, { dishId, ingredientId }, '요리 재료');

  await prisma.dishIngredient.delete({
    where: { 
      dishId_ingredientId: {
        dishId,
        ingredientId,
      }
     },
  });
};
