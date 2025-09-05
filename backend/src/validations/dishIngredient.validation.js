import { z } from 'zod';
import { idSchema } from '../utils/validations.js';

const quantitySchema = z.coerce.number().min(0, '수량은 0 이상이어야 합니다.');
const unitSchema = z
  .string()
  .min(1, '단위는 최소 1글자 이상이어야 합니다.')
  .max(50, '단위는 최대 50글자까지 가능합니다.');

export const addIngredientToDish = {
  params: z.object({
    dishId: idSchema,
  }).strict(),
  body: z
    .object({
      ingredientId: idSchema,
      quantity: quantitySchema,
      unit: unitSchema,
    })
    .strict(),
};

export const getIngredientsOfDish = {
  params: z.object({
    dishId: idSchema,
  }).strict(),
};

export const updateIngredientOfDish = {
  params: z.object({
    dishId: idSchema,
    ingredientId: idSchema,
  }).strict(),
  body: z
    .object({
      quantity: quantitySchema.optional(),
      unit: unitSchema.optional(),
    })
    .strict(),
};

export const removeIngredientFromDish = {
  params: z.object({
    dishId: idSchema,
    ingredientId: idSchema,
  }).strict(),
};
