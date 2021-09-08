import React, { useState, useEffect } from "react"
import Users from "./components/users"
import api from "./api"

const App = () => {
    const [users, setUsers] = useState([])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    useEffect(() => {
        api.users.fetchAll().then((result) => setUsers(result))
    }, [])

    const handleonBookmarkToggle = (userId) => {
        const newUsers = [...users]
        const userIndex = newUsers.findIndex((user) => user._id === userId)
        newUsers[userIndex].marked = !newUsers[userIndex].marked
        setUsers(newUsers)
    }

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmarkToggle={handleonBookmarkToggle}
            />
        </>
    )
}

export default App
