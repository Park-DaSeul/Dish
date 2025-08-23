/**
 * @description
 * 비동기 컨트롤러 함수에서 발생하는 에러를 처리하는 고차 함수입니다.
 * 컨트롤러 함수를 감싸서, Promise가 reject되거나 예외가 발생했을 때
 * 에러를 잡아 Express의 `next()` 함수로 전달합니다.
 * 이를 통해 모든 비동기 에러는 전역 에러 핸들러에서 처리됩니다.
 *
 * @param {Function} requestHandler - Express 라우트 핸들러 함수 (e.g., (req, res, next) => { ... })
 * @returns {Function} - 에러 핸들링이 적용된 새로운 라우트 핸들러 함수
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
