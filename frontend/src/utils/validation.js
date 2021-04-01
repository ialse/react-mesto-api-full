import { validators } from './validators';

export const handleValidation = (inputValues) => {
  // Преобразовывем объект с полями в объект с булевыми значениями и возвращаем этот объект
  const formKeys = Object.keys(inputValues);
  const allErrors = formKeys
    .map((key) => {
      const valueByKey = inputValues[key];

      if (!validators[key]) return {};

      const errors = Object.entries(validators[key])
        .map(([errorKey, validatorFn]) => {
          return { [errorKey]: validatorFn(valueByKey) };
        })
        .reduce((acc, item) => ({ ...acc, ...item }), {});

      return { [key]: errors };
    })
    .reduce((acc, item) => ({ ...acc, ...item }), {});

  // Если хоть одна проверка возвращает true, то блокируем кнопку
  let isInvalid = false;
  for (const keyInput in allErrors) {
    for (const keyCheck in allErrors[keyInput]) {
      if (allErrors[keyInput][keyCheck]) {
        isInvalid = true;
        break;
      }
    }
  }

  return { allErrors, isInvalid };
};
