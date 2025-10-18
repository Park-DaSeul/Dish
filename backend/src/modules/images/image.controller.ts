import { ImageService } from './image.service.js';
import type { Response } from 'express';
import type { UploadRequest } from '../../middlewares/cloudinary.upload.middleware.js';
import { deleteImageFromCloudinary } from '../../libs/cloudinary-service.js';

export class ImageController {
  constructor(private imageService: ImageService) {}

  // 사진 업로드
  public uploadImage = async (req: UploadRequest, res: Response) => {
    if (!req.cloudinaryResult) {
      throw new Error('사진 업로드 정보가 필요합니다.');
    }

    const publicId = req.cloudinaryResult.public_id;
    const url = req.cloudinaryResult.secure_url;

    const data = { publicId, url };

    try {
      const image = await this.imageService.uploadImage(data);
      return res.status(201).json(image);

      // DB 저장 실패 시 롤백 (Cloudinary 파일 삭제)
    } catch (dbError) {
      console.error('DB 저장 실패! Cloudinary 롤백을 시작합니다.', dbError);
      await deleteImageFromCloudinary(publicId);

      return res.status(500).json({ message: '사진 정보를 저장하는 데 실패했습니다.' });
    }
  };
}
