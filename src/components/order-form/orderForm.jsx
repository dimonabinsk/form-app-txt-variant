/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import FormLayout from "../formLayout";
import TextField from "../textField";
import SelectField from "../selectField";
import MultiSelect from "../multiSelect";
import CheckboxField from "../checkboxField";
// import { validate } from "../../utils/validator";
import { validationSchema } from "./validationSchema";
import {
    deliveryTypeList,
    needLiftFloorOptions,
    giftList,
    agreements
} from "./fieldsOptions";
import RadioField from "../radioField";
import { parseYupError } from "../../utils/parseYupError";

const OrderForm = () => {
    const [values, setValues] = useState({
        fio: "",
        email: "",
        address: "",
        deliveryType: "",
        needLiftFloor: "",
        gifts: [],
        agreement: []
    });

    // console.log(values.deliveryType);

    const [errors, setErrors] = useState({});

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            console.log("Отправлено!");
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        // const errors = validate(values, validationSchema);
        // setErrors(errors);

        // На месте вызова validate() в orderForm
        validationSchema
            /**
             * Устанавливаем параметр { abortEarly: false },
             * так Yup будет искать все ошибки по всем полям,
             * иначе он отдаст только одну и остановит проверку
             */
            .validate(values, { abortEarly: false })
            // Если ошибок нет, очищаем состояние ошибок
            .then(() => setErrors({}))
            // Если ошибки есть, добавляем их в состояние
            .catch((yupError) => {
                const errors = parseYupError(yupError);

                setErrors(errors);
            });
    }, [values]);

    return (
        <FormLayout title="Оформление заказа">
            <form onSubmit={handleSubmit}>
                <TextField
                    id="fio"
                    name="fio"
                    label="ФИО"
                    value={values.fio}
                    onChange={handleChange}
                    error={errors.fio}
                />

                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <TextField
                    id="address"
                    name="address"
                    label="Адрес доставки"
                    value={values.address}
                    onChange={handleChange}
                    error={errors.address}
                />
                <SelectField
                    label="Выберите доставку"
                    name="deliveryType"
                    value={values.deliveryType}
                    onChange={handleChange}
                    error={errors.deliveryType}
                    options={deliveryTypeList}
                    defaultOption="Выберите вариант доставки"
                />
                <div className="mt-4">
                    <RadioField
                        options={needLiftFloorOptions}
                        label="Нужен подъём на этаж ?"
                        value={values.needLiftFloor}
                        name="needLiftFloor"
                        onChange={handleChange}
                        error={errors.needLiftFloor}
                        typeDelivery={values.deliveryType}
                    />
                </div>
                <MultiSelect
                    options={giftList}
                    onChange={handleChange}
                    value={values.gifts}
                    name="gifts"
                    label="Выберите подарок"
                />

                <CheckboxField
                    name="agreement"
                    label="Подтвердите согласие"
                    options={agreements}
                    onChange={handleChange}
                    value={values.agreement}
                    error={errors.agreement}
                />

                <button
                    className="btn btn-primary w-100 mx-auto mt-5"
                    type="submit"
                >
                    Оформить
                </button>
            </form>
        </FormLayout>
    );
};

// OrderForm.propTypes = {};

export default OrderForm;
