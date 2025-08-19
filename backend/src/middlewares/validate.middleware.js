export const validate = (schemas) => (req, res, next) => {
  try {
    for (const key of Object.keys(schemas)) {
      const result = schemas[key].safeParse(req[key]);

      if (!result.success) {
        // ZodError를 next()로 전달 → 전역 에러 핸들러에서 처리
        return next(result.error);
      }
      // 안전한 값으로 덮어씌움
      req[key] = result.data;
    }
    next();
  } catch (err) {
    next(err); // 예상 못한 에러도 전역 핸들러로 넘김
  }
};
