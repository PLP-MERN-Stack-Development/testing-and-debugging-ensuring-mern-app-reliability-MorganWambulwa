// server/src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  // Log for debug
  // console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
}

module.exports = { errorHandler };
