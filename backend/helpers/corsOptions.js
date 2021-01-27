const corsOptions = {
  origin: [
    'http://ialse-mesto.students.nomoredomains.rocks',
    'http://www.ialse-mesto.students.nomoredomains.rocks',
    'http://api.ialse-mesto.students.nomoredomains.rocks',
    'http://www.api.ialse-mesto.students.nomoredomains.rocks',
    'https://ialse-mesto.students.nomoredomains.rocks',
    'https://www.ialse-mesto.students.nomoredomains.rocks',
    'https://api.ialse-mesto.students.nomoredomains.rocks',
    'https://www.api.ialse-mesto.students.nomoredomains.rocks',
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};

module.exports = { corsOptions };