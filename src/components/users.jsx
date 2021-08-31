import React, { useState } from "react"
import User from "./user"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"

const Users = ({ users: allUsers, ...rest }) => {
    const onPage = 5
    const [currentPage, setCurrentPage] = useState(1)

    const users = paginate(allUsers, onPage, currentPage)

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    if (!users.length) return

    return (
        <>
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

            <Pagination
                {...{
                    elementsCount: allUsers.length,
                    onPage: onPage,
                    currentPage: currentPage,
                    onPageChange: onPageChange
                }}
            />
        </>
    )
}

Users.propTypes = {
    users: PropTypes.object.isRequired
}

export default Users
