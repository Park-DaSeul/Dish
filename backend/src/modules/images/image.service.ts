import { ImageRepository } from './image.repository.js';
import type { Prisma } from '@prisma/client';
import type { UploadImageData } from './image.dto.js';

export class ImageService {
  constructor(private imageRepository: ImageRepository) {}

  // 사진 업로드
  public uploadImage = async (data: UploadImageData) => {
    const { publicId, url } = data;

    const createData: Prisma.ImageCreateInput = {
      publicId,
      url,
    };

    const image = await this.imageRepository.uploadImage(createData);

    return image;
  };
}