const Card = require('../../models/card'); // импортирую модель карточки
const NotFoundError = require('../../errors/not-found-err');

// Добавляю лайк в массив карточки
function addLike(req, res, next) {
  return Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Карточка не найдена в базе');
    })
    // данные не записались, вернём ошибку
    .catch(next);
}

module.exports = addLike;
