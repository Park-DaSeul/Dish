import { z } from 'zod';
import {
  idSchema,
  titleSchema,
  descriptionSchema,
  imageUrlSchema,
  cursorSchema,
  limitSchema,
  searchSchema,
  recipesSchema,
  ingredientsSchema,
} from '../utils/validations.js';

// 모든 요리 게시글 조회 (query)
export const getDishes = {
  query: z
    .object({
      cursor: cursorSchema,
      limit: limitSchema,
      search: searchSchema,
    })
    .strict(),
};

// 특정 요리 게시글 조회 (params)
export const getDishById = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};

// 요리 게시글 생성 (body)
export const createDish = {
  body: z
    .object({
      title: titleSchema,
      description: descriptionSchema,
      imageUrl: imageUrlSchema,
      recipes: recipesSchema,
      ingredients: ingredientsSchema,
    })
    .strict(),
};

// 요리 게시글 수정 (params + body)
export const updateDish = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
  body: z
    .object({
      title: titleSchema,
      description: descriptionSchema,
      imageUrl: imageUrlSchema,
      recipes: recipesSchema,
      ingredients: ingredientsSchema,
    })
    .partial()
    .strict(),
};

// 요리 게시글 삭제 (params)
export const deleteDish = {
  params: z
    .object({
      id: idSchema,
    })
    .strict(),
};
