import React, { useState, useEffect } from "react"
import Pagination from "./pagination"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import GroupList from "./groupList"
import api from "../api"
import SearchStatus from "./searchStatus"
import UserTable from "./usersTable"
import _ from "lodash"
import Bookmark from "./bookmark"
import QualitiesList from "./qualitiesList"

const Users = () => {
    const [users, setUsers] = useState([])

    const onDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    useEffect(() => {
        api.users.fetchAll().then((result) => setUsers(result))
    }, [])

    const onBookmarkToggle = (userId) => {
        const newUsers = [...users]
        const userIndex = newUsers.findIndex((user) => user._id === userId)
        newUsers[userIndex].marked = !newUsers[userIndex].marked
            ? true
            : undefined
        setUsers(newUsers)
    }

    const onPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ sort: "name", order: "asc" })

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    useEffect(() => {
        api.professions.fetchAll().then((result) => setProfessions(result))
    }, [])

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id) // ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        : users

    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, sortBy.sort, sortBy.order)

    const cropUsers = paginate(sortedUsers, onPage, currentPage)

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    const clearFilter = () => {
        setSelectedProf()
        setCurrentPage(1)
    }

    const columns = {
        name: {
            name: "Имя",
            path: "name"
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: {
            name: "Проффесия",
            path: "profession.name"
        },
        completedMeetings: {
            name: "Встретился, раз",
            path: "completedMeetings"
        },
        rate: {
            name: "Оценка",
            path: "rate"
        },
        marked: {
            name: "Избранное",
            path: "marked",
            component: (user) => (
                <Bookmark user={user} onToggle={onBookmarkToggle} />
            )
        },
        delete: {
            name: "",
            component: (user) => (
                <button
                    onClick={() => {
                        onDelete(user._id)
                    }}
                    data-id={user._id}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            )
        }
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
                    <UserTable
                        users={cropUsers}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        columns={columns}
                    />
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
    users: PropTypes.array.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default Users
