import express from 'express';
import * as dishController from './dishes.controller.js';
import { validateCreateBody, validateUpdateBody } from './dishes.dto.js';
import { validateId, validateGetQuery } from '../../common/index.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import passport from '../../libs/passport/index.js';
import { commentRouter } from '../comments/comments.route.js';

const dishRouter = express.Router();

// 모든 요리 게시글 조회 (인증 불필요)
dishRouter.route('/').get(validateGetQuery, asyncHandler(dishController.getDishes));

// --- 여기부터 로그인 필요 ---
commentRouter.use(passport.authenticate('access-token', { session: false }));

// 요리 게시글 생성
dishRouter.route('/').post(validateCreateBody, asyncHandler(dishController.createDish));

// 특정 요리 게시글 조회, 수정, 삭제 (/:id)
dishRouter
  .route('/:id')
  .get(validateId, asyncHandler(dishController.getDishById))
  .put(validateId, validateUpdateBody, asyncHandler(dishController.updateDish))
  .delete(validateId, asyncHandler(dishController.deleteDish));

dishRouter.use('/:dishId/comments', commentRouter);

export { dishRouter };
