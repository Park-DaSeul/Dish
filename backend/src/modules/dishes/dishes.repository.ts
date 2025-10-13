import prisma from '../../libs/prisma.js';
import type { Prisma } from '@prisma/client';

// 모든 요리 게시글 조회
export const getDishes = async (findQuery: Prisma.DishFindManyArgs) => {
  const dishes = await prisma.dish.findMany({
    ...findQuery,
    select: {
      id: true,
      title: true,
      description: true,
      dishIngredient: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      recipes: {
        select: {
          id: true,
          stepNumber: true,
          instruction: true,
          createdAt: true,
          updatedAt: true,
          image: {
            select: {
              id: true,
              url: true,
              publicId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          publicId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return dishes;
};

// 특정 요리 게시글 조회
export const getDishById = async (id: string) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      dishIngredient: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      recipes: {
        select: {
          id: true,
          stepNumber: true,
          instruction: true,
          createdAt: true,
          updatedAt: true,
          image: {
            select: {
              id: true,
              url: true,
              publicId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          publicId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return dish;
};

// 요리 게시글 생성
export const createDish = async (createData: Prisma.DishCreateInput) => {
  const dish = await prisma.dish.create({
    data: createData,
    select: {
      id: true,
      title: true,
      description: true,
      dishIngredient: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      recipes: {
        select: {
          id: true,
          stepNumber: true,
          instruction: true,
          createdAt: true,
          updatedAt: true,
          image: {
            select: {
              id: true,
              url: true,
              publicId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          publicId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return dish;
};

// 요리 게시글 수정
export const updateDish = async (id: string, updateData: Prisma.DishUpdateInput) => {
  const dish = await prisma.dish.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      title: true,
      description: true,
      dishIngredient: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          nickname: true,
        },
      },
      recipes: {
        select: {
          id: true,
          stepNumber: true,
          instruction: true,
          createdAt: true,
          updatedAt: true,
          image: {
            select: {
              id: true,
              url: true,
              publicId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      images: {
        select: {
          id: true,
          url: true,
          publicId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return dish;
};

// 요리 게시글 삭제
export const deleteDish = async (id: string) => {
  return await prisma.dish.delete({
    where: { id },
  });
};

// 요리 게시글 존재 확인
export const findDish = async (id: string) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
  });

  return dish;
};

// 요리 게시글 존재 및 관계 확인
export const findDishWithRelations = async (id: string) => {
  const dish = await prisma.dish.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      dishIngredient: true,
      userId: true,
      recipes: {
        select: {
          id: true,
          instruction: true,
        },
      },
    },
  });

  return dish;
};
