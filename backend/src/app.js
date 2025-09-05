import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler.js';
import { authRouter } from './routes/auth.route.js';
import { userRouter } from './routes/user.route.js';
import { dishRouter } from './routes/dish.route.js';
import { commentRouter } from './routes/comment.route.js';
import { recipeRouter, dishNestedRecipeRouter } from './routes/recipe.route.js';
import { ingredientRouter } from './routes/ingredient.route.js';
import { dishNestedDishIngredientRouter } from './routes/dishIngredient.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/dishes', dishRouter);
app.use('/api/comments', commentRouter);
app.use('/api/recipes', recipeRouter);
app.use('/api/dishes/:dishId/recipes', dishNestedRecipeRouter);
app.use('/api/ingredients', ingredientRouter);
app.use('/api/dishes/:dishId/ingredients', dishNestedDishIngredientRouter);

app.use(errorHandler); //전역 에러핸들러

app.listen(PORT, () => {
  console.log(`서버 실행 중 포트: ${PORT}`);
});
