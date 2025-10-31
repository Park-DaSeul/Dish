import express from 'express';
import prisma from '../../libs/prisma.js';
import { ImageRepository } from './image.repository.js';
import { ImageService } from './image.service.js';
import { ImageController } from './image.controller.js';
import { dishImageUpload, recipeImageUpload } from './image.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authenticate } from '../../middlewares/auth.middleware.js';

const imageRouter = express.Router();

// 의존성 주입
const imageRepository = new ImageRepository(prisma);
const imageService = new ImageService(imageRepository);
const imageController = new ImageController(imageService);

// --- 여기부터 로그인 필요 ---
imageRouter.use(authenticate);

// dish 사진 업로드
imageRouter.post('/dishes', dishImageUpload, asyncHandler(imageController.uploadImage));

// recipe 사진 업로드
imageRouter.post('/recipes', recipeImageUpload, asyncHandler(imageController.uploadImage));

export { imageRouter };
