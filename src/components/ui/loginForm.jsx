import React, { useEffect, useState } from "react"
import TextField from "../common/form/textField"
import { validator } from "../../utils/validator"
import CheckboxField from "../common/form/checkboxField"
// import * as yup from "yup"

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    })
    const [errors, setErrors] = useState({})

    const changeHandler = ({ name, value }) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        if (validate()) {
            console.log(formData)
        }
    }

    useEffect(() => {
        validate()
    }, [formData])

    const validarotConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email is incorected"
            }
        },
        password: {
            isRequired: {
                message: "Password is required"
            },
            hasCapitalSymbol: {
                message: "Password must contain an uppercase letter"
            },
            hasNumber: {
                message: "Password must contain a digit"
            },
            minLength: {
                value: 8,
                message: "Password must contain at least 8 characters"
            },
            maxLength: {
                value: 200,
                message: "Password must contain no more than 200 characters"
            }
        }
    }

    // const schema = yup.object().shape({
    //     email: yup
    //         .string()
    //         .required("Email is required")
    //         .email("Email is incorected"),
    //     password: yup
    //         .string()
    //         .required("Email is required")
    //         .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter")
    //         .matches(/(?=.*[0-9])/, "Password must contain a digit")
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             "Password must contain one of the special symbols !@#$%^&*"
    //         )
    //         .matches(/(?=.{8,})/, "Password must contain at least 8 characters")
    // })

    const validate = () => {
        const errors = validator(formData, validarotConfig)
        setErrors(errors)
        // schema
        //     .validate(formData)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }))

        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                error={errors?.email}
            />
            <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                error={errors?.password}
            />
            <CheckboxField
                name="rememberMe"
                value={formData.rememberMe}
                onChange={changeHandler}
            >
                Remember me
            </CheckboxField>
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default LoginForm
