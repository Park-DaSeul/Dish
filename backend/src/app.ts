import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './modules/auth/auth.route.js';
import { userRouter } from './modules/users/users.route.js';
import { dishRouter } from './modules/dishes/dishes.route.js';
import { imageRouter } from './modules/images/images.route.js';
import { commentRouter } from './modules/comments/comments.route.js';
import { likeRouter } from './modules/likes/likes.route.js';

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
app.use('/api/likes', likeRouter);

app.use(errorHandler); //전역 에러핸들러

app.listen(PORT, () => {
  console.log(`서버 실행 중 포트: ${PORT}`);
});
