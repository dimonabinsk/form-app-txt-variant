// components/order-form/validationSchema.js
import * as yup from "yup";

export const validationSchema = yup.object().shape({
    // объект с полями
    fio: yup
        .string()
        .required("ФИО обязательно для заполнения")
        .matches(
            /^(([a-zA-Zа-яА-Я]+)\s){1,}(([a-zA-Zа-яА-Я]+)\s?){1,}$/,
            "Введите корректное ФИО"
        ), // Все поля у нас строки, кроме...
    email: yup
        .string()
        .required("Электронная почта обязательна для заполнения")
        .email("Email введён некорректно"),
        address: yup.string().required("Адрес обязателен для заполнения"),
    deliveryType: yup.string().required("Выберите вариант доставки"),
    needLiftFloor: yup.string().required("Укажите, нужен ли подъём на этаж"),
    agreement: yup.array().test(
        "contains value", // название проверки
        "Согласие на обработку данных обязательно", // текст ошибки
        // функция, которая проверит валидность
        (value) => value.includes("1")
    ) // ...кроме agreement, он массив
});

// export const validationSchema = {
//     fio: {
//         isRequired: {
//             message: "ФИО обязательно для заполнения"
//         },
//         isFIO: {
//             message: "Введите корректное ФИО"
//         }
//     },
//     email: {
//         isRequired: {
//             message: "Электронная почта обязательна для заполнения"
//         },
//         isEmail: {
//             message: "Email введён некорректно"
//         }
//     },
//     deliveryType: {
//         isRequired: {
//             message: "Выберите вариант доставки"
//         }
//     },
//     needLiftFloor: {
//         isRequired: {
//             message: "Укажите, нужен ли подъём на этаж"
//         }
//     },
//     agreement: {
//         isContainValue: {
//             message: "Согласие на обработку данных обязательно",
//             param: "1" // должен содержать значение 1
//         }
//     }
// };
