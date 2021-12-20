import React from "react"
import { useParams } from "react-router-dom"
import UserListPage from "../components/page/userListPage"
import UserPage from "../components/page/userPage"
import UserEditPage from "../components/page/userEditPage"
import { UserProvider } from "../hooks/useUsers"

const UsersPage = () => {
    const params = useParams()
    const { userID, edit } = params
    let mode = "list"
    if (userID && edit) {
        mode = "edit"
    } else if (userID) {
        mode = "view"
    }

    return (
        <UserProvider>
            {mode === "view" && <UserPage id={userID} />}
            {mode === "edit" && <UserEditPage id={userID} />}
            {mode === "list" && <UserListPage />}
        </UserProvider>
    )
}

UsersPage.defaultProps = {
    mode: "view"
}
UsersPage.propTypes = {}

export default UsersPage
