import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import api from "../../../api"
import Qualities from "../../ui/qualities"
import { useHistory } from "react-router"

const UserPage = ({ id }) => {
    const [user, setUser] = useState()
    const history = useHistory()

    // const allUsersHandle = () => {
    //     history.replace("/users")
    // }
    const editUserHandle = () => {
        history.push("/users/" + id + "/edit")
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
            <Qualities qualities={user.qualities} />
            <div>completedMeetings: {user.completedMeetings}</div>
            <h3>Rate: {user.rate}</h3>
            <button onClick={editUserHandle} className="btn btn-secondary">
                Edit
            </button>
        </>
    )
}
UserPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default UserPage
