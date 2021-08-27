import React, { useState } from "react"
import Users from "./components/users"
import api from "./api"
import SearchStatus from "./components/searchStatus"

const App = () => {
  let [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const handleonBookmarkToggle = (userId) => {
    const newUsers = [...users]
    const userIndex = newUsers.findIndex((user) => user._id === userId)
    newUsers[userIndex].marked = !newUsers[userIndex].marked
    setUsers(newUsers)
  }

  return (
    <>
      <SearchStatus usersCount={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onBookmarkToggle={handleonBookmarkToggle}
      />
    </>
  )
}

export default App
