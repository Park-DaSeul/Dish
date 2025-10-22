import type { Prisma, PrismaClient } from '@prisma/client';

export class DishRepository {
  constructor(private prisma: PrismaClient) {}

  // 모든 요리 게시글 조회
  public getDishes = async (getQuery: Prisma.DishFindManyArgs) => {
    const dishes = await this.prisma.dish.findMany({
      ...getQuery,
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
  public getDishById = async (id: string) => {
    const dish = await this.prisma.dish.findUnique({
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
  public createDish = async (createData: Prisma.DishCreateInput) => {
    const dish = await this.prisma.dish.create({
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
  public updateDish = async (id: string, updateData: Prisma.DishUpdateInput) => {
    const dish = await this.prisma.dish.update({
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
  public deleteDish = async (id: string) => {
    return await this.prisma.dish.delete({
      where: { id },
    });
  };
}
