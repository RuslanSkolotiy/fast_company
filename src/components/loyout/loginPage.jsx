import React, { useEffect, useState } from "react"
import TextField from "../textField"
import { validator } from "../../utils/validator"

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    const changeHandler = ({ target }) => {
        const { name, value } = target
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

    const validate = () => {
        const errors = validator(formData, validarotConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    <h3 className="mb-4">Login</h3>
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
                        <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
