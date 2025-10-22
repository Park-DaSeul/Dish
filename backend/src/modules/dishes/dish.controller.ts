import { DishService } from './dish.service.js';
import type { Response } from 'express';
import type {
  GetDishesRequest,
  GetDishByIdRequest,
  CreateDishRequest,
  UpdateDishRequest,
  DeleteDishRequest,
} from './dish.dto.js';

export class DishController {
  constructor(private dishService: DishService) {}

  // 모든 요리 게시물 조회
  public getDishes = async (req: GetDishesRequest, res: Response) => {
    const query = req.parsedQuery;

    const dishesData = await this.dishService.getDishes(query);
    return res.json({ success: true, data: dishesData });
  };

  // 특정 요리 게시물 조회
  public getDishById = async (req: GetDishByIdRequest, res: Response) => {
    const { id } = req.parsedParams;

    const dish = await this.dishService.getDishById(id);
    return res.json({ success: true, data: dish });
  };

  // 요리 게시물 생성
  public createDish = async (req: CreateDishRequest, res: Response) => {
    const userId = req.user.id;

    const data = req.parsedBody;
    const dish = await this.dishService.createDish(userId, data);
    return res.status(201).json({ success: true, data: dish });
  };

  // 요리 게시물 수정
  public updateDish = async (req: UpdateDishRequest, res: Response) => {
    const { id } = req.parsedParams;

    const resource = req.resource;

    const data = req.parsedBody;
    const dish = await this.dishService.updateDish(id, data, resource);
    return res.json({ success: true, data: dish });
  };

  // 요리 게시물 삭제
  public deleteDish = async (req: DeleteDishRequest, res: Response) => {
    const { id } = req.parsedParams;

    await this.dishService.deleteDish(id);
    return res.status(200).json({ success: true, message: '요리 게시글이 삭제되었습니다.' });
  };
}
