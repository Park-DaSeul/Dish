import type { Prisma, PrismaClient } from '@prisma/client';

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  // 모든 사용자 조회
  public getUsers = async (getQuery: Prisma.UserFindManyArgs) => {
    const users = await this.prisma.user.findMany({
      ...getQuery,
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  };

  // 특정 사용자 조회
  public getUserById = async (id: string) => {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  };

  // 사용자 수정
  public updateUser = async (id: string, updateData: Prisma.UserUpdateInput) => {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        nickname: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  };

  // 사용자 삭제
  public deleteUser = async (id: string) => {
    return await this.prisma.user.delete({
      where: { id },
    });
  };

  // 사용자 확인
  public findUser = async (id: string) => {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  };
}
