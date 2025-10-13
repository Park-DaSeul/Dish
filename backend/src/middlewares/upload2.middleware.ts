import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { Request } from 'express';

// --- (기존 유틸리티 함수 및 설정은 유지) ---

// 파일 타입과 해당 파일이 저장될 경로를 매핑합니다.
const uploadPaths: Record<string, string> = {
  dishes: 'uploads/dishes',
  recipes: 'uploads/recipes',
};

// 주어진 경로에 디렉토리가 없으면 생성하는 함수
const createDirectory = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Multer storage 설정을 생성하는 함수
const createStorage = (destination: string) => {
  createDirectory(destination); // 디렉토리 생성
  return multer.diskStorage({
    destination: (_req: Request, _file: Express.Multer.File, cb) => {
      cb(null, destination);
    },
    filename: (_req: Request, file: Express.Multer.File, cb) => {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      // 파일명 중복을 피하기 위해 현재 시간을 앞에 추가
      cb(null, `${Date.now()}-${basename}${ext}`);
    },
  });
};

// 파일 필터 함수 (이미지 파일만 허용)
const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('지원되지 않는 파일 형식입니다.'));
  }
  cb(null, true);
};

// 업로드 타입에 대한 타입 별칭 정의
type UploadType = 'dishes' | 'recipes'; // 필요한 타입만 유지

// Multer 인스턴스 기본 생성 함수
const createUploader = (type: UploadType) => {
  const destination = uploadPaths[type];

  if (destination === undefined) throw new Error('지원되지 않는 업로드 타입입니다.');

  return multer({
    storage: createStorage(destination),
    fileFilter: imageFileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 사이즈 제한
  });
};

// ----------------------------------------------------
// ⭐️ 새로운 통합 업로드 미들웨어 정의
// ----------------------------------------------------

/**
 * 요리 게시글 및 레시피 단계별 이미지를 단일 요청으로 처리하는 미들웨어입니다.
 * * 프론트엔드에서 파일을 전송할 때 다음과 같은 필드 이름을 사용해야 합니다:
 * 1. Dish 메인 이미지: 'dishImages' (최대 5개)
 * 2. 레시피 단계 이미지: 'recipeStepImages' (최대 10개)
 * * @example
 * // 라우터에서 사용
 * router.post('/dishes', dishAndRecipeImagesUpload, controller.createDish);
 */
export const dishAndRecipeImagesUpload = multer({
  // 모든 파일을 'uploads/dishes' 경로에 임시 저장합니다.
  // (선택 사항: 파일 키에 따라 저장 경로를 분리할 수도 있지만, 이 예제에서는 단순화합니다.)
  storage: createStorage(uploadPaths.dishes),
  fileFilter: imageFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).fields([
  { name: 'dishImages', maxCount: 5 }, // Dish 메인 이미지 (1:N)
  { name: 'recipeStepImages', maxCount: 10 }, // 레시피 단계 이미지 (단계 수에 맞춤)
]);

// 기존 개별 export 제거 (대신 dishAndRecipeImagesUpload를 사용)
// export const dishesImageUpload = createUploader('dishes').array('image', 5);
// export const recipesImageUpload = createUploader('recipes').single('image');
