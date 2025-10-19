import { cloudinaryUploader } from '../../middlewares/cloudinary.upload.middleware.js';
import type { UploadApiOptions } from 'cloudinary';

// ------------
// |  UPLOAD  |
// ------------

// dish 사진 업로드
const dishOption: UploadApiOptions = {
  resource_type: 'image',
  folder: 'dishes',
  type: 'upload',
};

// recipe 사진 업로드
const recipeOption: UploadApiOptions = {
  resource_type: 'image',
  folder: 'recipes',
  type: 'upload',
};

// dish 사진 업로드
export const dishImageUpload = cloudinaryUploader(dishOption);

// recipe 사진 업로드
export const recipeImageUpload = cloudinaryUploader(recipeOption);
