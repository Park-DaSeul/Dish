import { z } from 'zod';
import {
  idSchema,
  dishIdSchema,
  stepNumberSchema,
  instructionSchema,
  durationSchema,
  imageUrlSchema,
} from '../utils/validations.js';

// 모든 레시피 조회 (params)
export const getRecipes = {
  params: z
    .object({
      dishId: dishIdSchema,
    })
    .strict(),
};

// 특정 레시피 조회 (params)
export const getRecipeById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 레시피 생성 (params + body)
export const createRecipe = {
  params: z
    .object({
      dishId: dishIdSchema,
    })
    .strict(),
  body: z
    .object({
      stepNumber: stepNumberSchema,
      instruction: instructionSchema,
      imageUrl: imageUrlSchema.optional(),
      duration: durationSchema,
    })
    .strict(),
};

// 레시피 수정 (params + body)
export const updateRecipe = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      stepNumber: stepNumberSchema.optional(),
      instruction: instructionSchema.optional(),
      imageUrl: imageUrlSchema.optional(),
      duration: durationSchema.optional(),
    })
    .strict(),
};

// 레시피 삭제 (params)
export const deleteRecipe = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};
