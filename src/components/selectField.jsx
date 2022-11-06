// components/selectField.jsx
import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    name,
    value,
    onChange,
    error,
    options,
    defaultOption
}) => {
    const getSelectClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    return (
        <div>
            <label htmlFor="validationCustom04" className="htmlForm-label">
                {label}
            </label>
            <select
                className={getSelectClasses()}
                value={value}
                onChange={onChange}
                id={name}
                name={name}
            >
                <option value="">{defaultOption}</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.defaultProps = {
    defaultOption: "Выберите вариант..."
};

SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ),
    defaultOption: PropTypes.string
};

export default SelectField;
