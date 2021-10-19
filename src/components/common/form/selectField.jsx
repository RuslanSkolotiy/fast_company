import React from "react"
import PropTypes from "prop-types"

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    error,
    defaultOption
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                name: options[option].name,
                value: options[option]._id
            }))
            : options

    const onHandleChange = ({ target }) => {
        const { name, value } = target
        onChange({ name, value })
    }

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={
                    "form-select" + (!error ? " is-valid" : " is-invalid")
                }
                name={name}
                id={name}
                value={value}
                onChange={onHandleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
SelectField.defaultProps = {
    type: "text",
    defaultOption: ""
}
SelectField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    defaultOption: PropTypes.string
}

export default SelectField
