import React, { useState, useEffect } from "react"
import User from "./user"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import api from "../api"
import SearchStatus from "./searchStatus"
// import _ from "lodash"

const Users = ({ users: allUsers, ...rest }) => {
    const onPage = 2
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    useEffect(() => {
        api.professions.fetchAll().then((result) => setProfessions(result))
    }, [])

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id) // ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        : allUsers

    const count = filteredUsers.length
    const users = paginate(filteredUsers, onPage, currentPage)

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const clearFilter = () => {
        setSelectedProf()
        setCurrentPage(1)
    }

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        onClick={() => clearFilter()}
                        className="btn btn-secondary mt-2"
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column w-100">
                <SearchStatus usersCount={count} />
                {count > 0 && (
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
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        {...{
                            elementsCount: count,
                            onPage: onPage,
                            currentPage: currentPage,
                            onPageChange: onPageChange
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired
}

export default Users
