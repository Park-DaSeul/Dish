import * as imageRepository from './images.repository.js';
import type { Prisma } from '@prisma/client';
import type { UploadImageData } from './images.dto.js';

// 사진 업로드
export const uploadImage = async (data: UploadImageData) => {
  const { publicId, url } = data;

  const createData: Prisma.ImageCreateInput = {
    publicId,
    url,
  };

  const image = await imageRepository.uploadImage(createData);

  return image;
};
