export const validate = (schemas) => (req, res, next) => {
  try {
    // body 검사
    if (schemas.body) {
      req.body = schemas.body.parse(req.body);
    }

    // params 검사
    if (schemas.params) {
      req.params = schemas.params.parse(req.params);
    }

    // query 검사
    if (schemas.query) {
      req.query = schemas.query.parse(req.query);
    }

    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
    });
  }
};
