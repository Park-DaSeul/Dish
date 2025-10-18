import type { Prisma, PrismaClient } from '@prisma/client';

export class ImageRepository {
  constructor(private prisma: PrismaClient) {}

  // 사진 업로드
  public uploadImage = async (createData: Prisma.ImageCreateInput) => {
    const image = await this.prisma.image.create({
      data: createData,
      select: { id: true },
    });

    return image;
  };
}