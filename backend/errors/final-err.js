// обработчик ошибок централизованный
const finalErr = (err, req, res, next) => {
  let { statusCode = 500 } = err;
  const { message } = err;

  // если произошла валидация по схеме, ставим статус 400
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = finalErr;
