const Card = require('../../models/card'); // импортирую модель карточки

// Добавляю карточку в базу
async function addCard(req, res, next) {
  const { name, link } = req.body; // беру данные из запроса

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      const { _id } = card;
      return Card.findById({ _id })
        .populate('owner');
    })
    .then((card) => res.status(200).send(card))
    .catch(next);
}

module.exports = addCard;
