import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router"
import TextField from "../../common/form/textField"
import { validator } from "../../../utils/validator"
import SelectField from "../../common/form/selectField"
import MultiSelectField from "../../common/form/multiSelectField"
import RadioField from "../../common/form/radioField"
import { useProfession } from "../../../hooks/useProfessions"
import { useQualities } from "../../../hooks/useQualities"
import { useUser } from "../../../hooks/useUsers"
import { useAuth } from "../../../hooks/useAuth"

const UserEditPage = ({ id }) => {
    const history = useHistory()
    const { getUserById } = useUser()
    const { updateUser, currentUser } = useAuth()
    const { reloadUsers } = useUser()
    if (currentUser._id !== id) {
        setTimeout(() => {
            history.push(`/users/${currentUser._id}/edit`)
        })
    }
    const [formData, setFormData] = useState(getUserById(id))
    const { professions, isLoading: isProfessionsLoading } = useProfession()
    const { qualities, isLoading: isQualitiesLoading } = useQualities()

    const [errors, setErrors] = useState({})

    useEffect(() => {
        setFormData(getUserById(id))
    }, [id])

    useEffect(() => {
        validate()
    }, [formData])

    const validarotConfig = {
        name: {
            isRequired: {
                message: "Name is required"
            }
        },
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email is incorected"
            }
        }
    }

    const validate = () => {
        const errors = validator(formData, validarotConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const changeHandler = ({ name, value }) => {
        if (name === "qualities") {
            value = value.map((item) => item.value)
        }
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (validate()) {
            await updateUser(formData)
            await reloadUsers()
            goBackHandler()
        }
    }

    const goBackHandler = () => {
        history.push("/users/" + id + "")
    }

    if (!formData || isProfessionsLoading || isQualitiesLoading) {
        return <>Loading...</>
    }

    return (
        <>
            <div className="container">
                <button className="btn btn-primary" onClick={goBackHandler}>
                    Go back
                </button>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={changeHandler}
                        error={errors?.name}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        error={errors?.email}
                    />
                    <SelectField
                        label="Profession"
                        name="profession"
                        value={formData.profession}
                        onChange={changeHandler}
                        options={professions.map((profession) => ({
                            name: profession.name,
                            value: profession._id
                        }))}
                        error={errors?.profession}
                        defaultOption="Choose..."
                    />
                    <RadioField
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" },
                            { name: "Other", value: "other" }
                        ]}
                        value={formData.sex || "other"}
                        onChange={changeHandler}
                        name="sex"
                        label="Sex"
                    />
                    <MultiSelectField
                        options={qualities.map((item) => ({
                            label: item.name,
                            value: item._id
                        }))}
                        onChange={changeHandler}
                        name="qualities"
                        label="Qualities"
                        value={formData.qualities.map((qualityId) => ({
                            label: qualities.find(
                                (item) => item._id === qualityId
                            ).name,
                            value: qualityId
                        }))}
                    />
                    <button
                        disabled={!isValid}
                        className="btn btn-primary w-100"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    )
}
UserEditPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default UserEditPage
