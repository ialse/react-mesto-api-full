export const definitionError = (res) => {
  if (res.ok) {
    return res.json();
  }

  if (res.ok < 500) {
    return res.json().then((error) => {
      throw new Error(error.message);
    });
  }

  throw new Error("Ошибка сервера");
};
