const NotFoundError = require('../errors/not-found-err');

// Если ввели любую другую страницу
function notFound() {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
}

module.exports = notFound;
