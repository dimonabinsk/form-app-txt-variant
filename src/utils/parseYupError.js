/* eslint-disable no-prototype-builtins */
// utils/parseYupError.js

export const parseYupError = (yupError) => {
    const { inner } = yupError;
// Создаём объект с ошибками
    return Array.isArray(inner)
        ? inner.reduce((acc, item) => {
              const { path, errors } = item;

              if (!acc.hasOwnProperty(path) && errors.length) {
                  acc[path] = errors[0];
              }

              return acc;
          }, {})
        : {};
};
