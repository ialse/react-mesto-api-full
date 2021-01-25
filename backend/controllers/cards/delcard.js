const Card = require('../../models/card'); // импортирую модель карточки
const NotFoundError = require('../../errors/not-found-err');
const ForbiddenError = require('../../errors/forbidden-err');

// Удаляю карточку из базы
function delCard(req, res, next) {
  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена в базе');
      }
      // проверяем, принадлежит ли карточка владельцу
      if (req.user._id === String(card.owner)) {
        return Card.findByIdAndRemove(req.params.cardId);
      }
      throw new ForbiddenError('Удалять карточку может только ее владелец');
    })
    .then((card) => {
      if (card) {
        return res.status(200).send({ message: `Удалена карточка: ${card.name}, ${card.link}` });
      }
    })
    .catch(next);
}

module.exports = delCard;
