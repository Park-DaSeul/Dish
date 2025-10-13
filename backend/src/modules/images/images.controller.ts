import * as imageService from './images.service.js';
import type { Response } from 'express';
import type { UploadRequest } from '../../middlewares/cloudinary-upload-middleware.js';
import { v2 as cloudinary } from 'cloudinary';

// 사진 업로드
export const uploadImage = async (req: UploadRequest, res: Response) => {
  if (!req.cloudinaryResult) {
    throw new Error('사진 업로드 정보가 필요합니다.');
  }

  const publicId = req.cloudinaryResult.public_id;
  const url = req.cloudinaryResult.secure_url;

  const data = { publicId, url };

  try {
    const image = await imageService.uploadImage(data);
    return res.status(201).json(image);

    // DB 저장 실패 시 롤백 (Cloudinary 파일 삭제)
  } catch (dbError) {
    console.error('DB 저장 실패! Cloudinary 롤백을 시작합니다.', dbError);
    await deleteImageFromCloudinary(publicId);

    return res.status(500).json({ message: '사진 정보를 저장하는 데 실패했습니다.' });
  }
};

// Cloudinary 롤백 함수
const deleteImageFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      type: 'upload',
      resource_type: 'image',
    });
    console.log(`롤백 성공: Cloudinary 사진 삭제 완료 - Public ID: ${publicId}`);
  } catch (err) {
    console.error(`롤백 실패: Cloudinary 사진 삭제 실패 - Public ID: ${publicId}`, err);
  }
};
