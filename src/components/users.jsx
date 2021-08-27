import React from "react"
import User from "./user"

const Users = ({ users, ...rest }) => {
  return (
    <>
      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Проффесия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} {...rest} key={user._id} />
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  )
}

export default Users
