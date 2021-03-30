# Проект Mesto с системами авторизации и регистрации пользователей

Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.  
Бэкенд в директории `backend/`  
Фронтенд - в `frontend/`

#### Ссылки на проект:

Фронтэнд https://mesto-ialse.students.nomoredomains.rocks  
Бэкенд https://api.mesto-ialse.students.nomoredomains.rocks

## Фронтенд

Проект с использованием библиотеки React. Функциональные блоки разделены на компоненты. Применен декларативный подход, когда состояние блоков меняется в зависимости от переменной. Используется функциональный подход при построении приложения.

### Общая функциональность приложения:

- Приложение адаптировано для разных разрешений экрана (от 320 до 1280 и больше)
- Реализована работа модальных окон при редактировании пользователя, аватара, добавлении карточки, открытии карточки, при авторизации и регистрации (сообщения об ошибке или об успешной регистрации)
- Реализовано проставление и удаление лайков
- Реализовано добавление и удаление карточки (пользователь может удалить только свою карточку)
- Авторизация реализована на cookies: пользователю достаточно один раз авторизоваться, чтобы при повторном открытии сайта заходить на личные страницы. Внутренние роуты защищены для неавторизованных пользователей.
- Реализованы запросы к бэкенду с использованием промисов. В момент выполнения запросов работают прелоадеры. Все промисы завершаются Catch. При ошибках пользователю показываются сообщения.
- Реализована моментальная валидация полей в формах(форма регистрации, авторизации, профиля, добавления карточки). Кнопки заблокированы до тех пор, пока поля невалидные.
- Реализованы Прелоадеры в момент запроса к серверу

### CSS

Для построения галерей в виде сеток используются такие свойства CSS как grid. Используются @media запросы для придания сайту отзывчивости, что положительно сказывается на устройствах с разными разрешениями экранов. Используется свойство Transition для эффекта плавного перехода. Блоки используются в нескольких местах верстки, что сокращает общий размер кода.

### БЭМ

Для лучшего понимания кода и файловой структуры используются принципы БЭМ, позволяющие создать легкочитаемый код для будущих доработок без значительных трудозатрат.

## Бэкенд

Node.js + Express.js + mongoose + MongoDB Для тестирования запросов использовался Postman.

API:

GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по \_id
GET /users/me - возвращает информацию о текущем пользователе
POST /users — создаёт пользователя

GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору

PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар
PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки

POST /signin — для авторизации
POST /signup — для регистрации нового пользователя

- Авторизация реализована на cookies: пользователю достаточно один раз авторизоваться, чтобы при повторном открытии сайта заходить на личные страницы. Внутренние роуты защищены для неавторизованных пользователей.
- Пароль хранится в виде хэша
- Реализована превалидация на celebrate перед передачей данных в контроллеры
- Реализована централизованная обработка ошибок. При любой ошибке API возвращается понятный ответ. Все обработчики завершаются catch
- Реализовано логирование на сервере
- Установлено ограничение на кол-во запросов с одного IP
- Бэкенд задеплоен на виртуальный сервер cloud.yandex.ru . ОС - Ubuntu 18.04. Был настроен nginx, выпущены сертификаты для защищенного соединения, настроена бесперебойная работа приложения.

### Стэк:

1. Visual studio code
2. Git Bash
3. GitHub
4. Google Chrome developer
5. Figma
6. Webpack

#### Ссылки:

Приложение Место на React без авторизации: https://github.com/ialse/mesto-react  
Приложение Место на нативном JS без авторизации с использованием классов: https://github.com/ialse/mesto
