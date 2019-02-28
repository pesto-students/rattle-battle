const handleUnauthorised = (err, req, res, next) => {
  if (err && err.name === 'UnauthorizedError') {
    return res.status(401).send({
      errors: 'Auth token has expired',
    });
  }
  return next();
};

export default handleUnauthorised;
