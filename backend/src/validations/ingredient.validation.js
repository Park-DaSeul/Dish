import { z } from 'zod';
import { idSchema, nameSchema } from '../utils/validations.js';

// 모든 재료 조회 (params)
export const getIngredients = {
  query: z
    .object({
      search: z.string().optional(),
    })
    .strict(),
};

// 특정 재료 조회 (params)
export const getIngredientById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 재료 생성 (body)
export const createIngredient = {
  body: z
    .object({
      name: nameSchema,
    })
    .strict(),
};

// 재료 수정 (params + body)
export const updateIngredient = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      name: nameSchema,
    })
    .strict(),
};

// 재료 삭제 (params)
export const deleteIngredient = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};
