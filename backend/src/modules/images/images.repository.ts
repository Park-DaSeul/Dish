import type { Prisma } from '@prisma/client';

// 사진 업로드
export const uploadImage = async (createData: Prisma.ImageCreateInput) => {
  const image = await prisma.image.create({
    data: createData,
    select: { id: true },
  });

  return image;
};
