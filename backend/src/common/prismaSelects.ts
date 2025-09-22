import type { Prisma } from '@prisma/client';

// user
export const userSelect = {
  id: true,
  name: true,
  nickname: true,
} satisfies Prisma.UserSelect;

export const meSelect = {
  id: true,
  name: true,
  nickname: true,
  email: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

// dish
export const dishSelect = {
  id: true,
  title: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  recipe: {
    select: recipeSelect,
  },
  dishIngredient: {
    select: dishIngredientSelect,
  },
  _count: {
    select: {
      likes: true,
      comments: true,
    },
  },
} satisfies Prisma.DishSelect;

// comment
export const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CommetSelect;

// recipe
export const recipeSelect = {
  id: true,
  stepNumber: true,
  instruction: true,
  imageUrl: true,
  duration: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.RecipeSelect;

// ingredient
export const ingredientSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.IngredientSelect;

// dishIngredient
export const dishIngredientSelect = {
  quantity: true,
  unit: true,
  createdAt: true,
  updatedAt: true,
  ingredient: {
    select: ingredientSelect,
  },
} satisfies Prisma.DishingredientSelect;
