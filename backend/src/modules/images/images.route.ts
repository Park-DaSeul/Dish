import express from 'express';
import * as imageController from './images.controller.js';
import { dishImageUpload, recipeImageUpload } from '../../middlewares/cloudinary-upload-middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import passport from '../../libs/passport/index.js';

const imageRouter = express.Router();

// --- 여기부터 로그인 필요 ---
imageRouter.use(passport.authenticate('access-token', { session: false }));

// dish 사진 업로드
imageRouter.route('/dishes').post(dishImageUpload, asyncHandler(imageController.uploadImage));

// recipe 사진 업로드
imageRouter.route('/recipes').post(recipeImageUpload, asyncHandler(imageController.uploadImage));

export { imageRouter };
