import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from '../controllers/user.controller.js';
import { validateUser } from '../validation/user.validation.js';

const router = express.Router();

// 회원가입
router.post('/signup', validateUser, createUser);

// 로그인
router.post('/login', loginUser);

// 모든 유저 조회
router.get('/', getUsers);

// 특정 유저 조회, 수정, 삭제 (/:id)
router
  .route('/:id')
  .get(getUserById)
  .put(validateUser, updateUser)
  .delete(deleteUser);

export default router;
