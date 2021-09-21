import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../api"
import QualitiesList from "./qualitiesList"
import { useHistory } from "react-router"

const UserDescription = ({ id }) => {
    const [user, setUser] = useState()
    const history = useHistory()

    const allUsersHandle = () => {
        history.replace("/users")
    }

    useEffect(() => {
        api.users.getById(id).then((result) => {
            setUser(result)
        })
    }, [])

    if (!user) return <>Loading...</>

    return (
        <>
            <h2>{user.name}</h2>
            <h3>Профессия: {user.profession.name}</h3>
            <QualitiesList qualities={user.qualities} />
            <div>completedMeetings: {user.completedMeetings}</div>
            <h3>Rate: {user.rate}</h3>
            <button onClick={allUsersHandle} className='btn btn-secondary'>Все пользователи</button>
        </>
    )
}

UserDescription.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default UserDescription
