//전역 에러핸들러
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || '알 수 없는 에러',
  });
};
