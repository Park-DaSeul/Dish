import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './modules/auth/auth.router.js';
import { userRouter } from './modules/users/user.router.js';
import { dishRouter } from './modules/dishes/dish.router.js';
import { imageRouter } from './modules/images/image.router.js';
import { commentRouter } from './modules/comments/comment.router.js';
// import { likeRouter } from './modules/likes/like.router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/images', imageRouter);
app.use('/api/comments', commentRouter);
// app.use('/api/likes', likeRouter);

app.use(errorHandler); //전역 에러핸들러

app.listen(PORT, () => {
  console.log(`서버 실행 중 포트: ${PORT}`);
});
