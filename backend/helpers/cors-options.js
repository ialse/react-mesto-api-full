const corsOptions = {
  origin: [
    'http://mesto-ialse.students.nomoredomains.rocks',
    'http://www.mesto-ialse.students.nomoredomains.rocks',
    'http://api.mesto-ialse.students.nomoredomains.rocks',
    'http://www.api.mesto-ialse.students.nomoredomains.rocks',
    'https://mesto-ialse.students.nomoredomains.rocks',
    'https://www.mesto-ialse.students.nomoredomains.rocks',
    'https://api.mesto-ialse.students.nomoredomains.rocks',
    'https://www.api.mesto-ialse.students.nomoredomains.rocks',
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
