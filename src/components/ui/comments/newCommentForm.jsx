import React, { useState } from "react"
import TextareaField from "../../common/form/textareaField"
import { validator } from "../../../utils/validator"
import PropTypes from "prop-types"
import { useComments } from "../../../hooks/useComments"

const NewCommentForm = ({ pageId }) => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const { createComment } = useComments()

    const changeHandler = ({ name, value }) => {
        setFormData((prevState) => ({ ...prevState, [name]: value }))
        validate()
    }

    const validarotConfig = {
        message: {
            isRequired: {
                message: "Message is required"
            }
        }
    }
    const validate = () => {
        const errors = validator(formData, validarotConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate()) {
            createComment({
                pageId: pageId,
                content: formData.message
            })
            setFormData({})
        }
    }

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <TextareaField
                            label="Message"
                            name="message"
                            value={formData.message || ""}
                            onChange={changeHandler}
                            error={errors.message}
                        />

                        <button
                            className="btn btn-primary float-end"
                            disabled={!isValid}
                        >
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

NewCommentForm.propTypes = {
    pageId: PropTypes.string
}

export default NewCommentForm
