import React from "react"
import Users from "../users"
import { useParams } from "react-router-dom"
import UserDescription from "../userDescription"

const UsersPage = () => {
    const params = useParams()
    const { userID } = params
    return userID ? <UserDescription id={userID} /> : <Users />
}

export default UsersPage
