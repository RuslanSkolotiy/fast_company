import React, { useState } from "react"
import api from "../api"
import { countFormat } from "../lib"

const Users = () => {
  let [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }

  const renderPhrase = (count) => {
    if (!count) return `Никто с тобой не тусанёт`
    return `${count} ${countFormat(count, [
      "человек",
      "человека",
      "человек",
    ])} тусанёт с тобой сегодня`
  }

  const headerClass = ["badge", users.length ? "bg-primary" : "bg-danger"].join(
    " "
  )

  return (
    <>
      <h2>
        <span className={headerClass}>{renderPhrase(users.length)}</span>
      </h2>
      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Проффесия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>
                    {user.qualities.map((quality) => {
                      let style = ["badge", "m-1", "bg-" + quality.color].join(
                        " "
                      )
                      return (
                        <span className={style} key={quality._id}>
                          {quality.name}
                        </span>
                      )
                    })}
                  </td>
                  <td>{user.profession.name}</td>
                  <td>{user.completedMeetings}</td>
                  <td>{user.rate}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(user._id)
                      }}
                      data-id={user._id}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  )
}

export default Users
