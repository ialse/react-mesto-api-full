const Card = require('../../models/card');

// Получаю все карточки из базы
function getCards(req, res, next) {
  return Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

module.exports = getCards;
