import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/auth.routes.js';
import { userRouter } from './routes/user.routes.js';
import { dishRouter } from './routes/dish.routes.js';
import { commentRouter } from './routes/comment.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/dishes', dishRouter);
app.use('/comments', commentRouter);

app.use(errorHandler); //전역 에러핸들러

app.listen(PORT, () => {
  console.log(`서버 실행 중 포트: ${PORT}`);
});
