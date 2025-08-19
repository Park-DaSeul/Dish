//전역 에러핸들러
export const errorHandler = (err, req, res, next) => {
  // Zod 에러 처리
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.issues, // Zod가 issues를 errors로 제공
    });
  }

  // 그 외 일반 에러 처리
  console.error(err); // 서버 로그에 기록
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
};
