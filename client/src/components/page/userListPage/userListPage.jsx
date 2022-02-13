import React, { useState, useEffect } from "react"
import Pagination from "../../common/pagination"
import { paginate } from "../../../utils/paginate"
import GroupList from "../../common/groupList"
import SearchStatus from "../../ui/searchStatus"
import UserTable from "../../ui/usersTable"
import _ from "lodash"
import Bookmark from "../../common/bookmark"
import Qualities from "../../ui/qualities"
import { Link } from "react-router-dom"
import SearchRow from "../../ui/searchRow"
import Profession from "../../ui/profession"
import { useSelector } from "react-redux"
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions"
import { getCurrentUserId, getUsers } from "../../../store/users"

const UserListPage = () => {
    const users = useSelector(getUsers())
    const [searchString, setSearchString] = useState("")
    const currentUserId = useSelector(getCurrentUserId())

    const onBookmarkToggle = (userId) => {
        console.log(userId)
        /* const newUsers = [...users]
         const userIndex = newUsers.findIndex((user) => user._id === userId)
         newUsers[userIndex].marked = !newUsers[userIndex].marked
             ? true
             : undefined
         setUsers(newUsers) */
    }

    const onPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    const professions = useSelector(getProfessions())
    const isProfessionsLoading = useSelector(getProfessionsLoadingStatus())
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ sort: "name", order: "asc" })

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    if (!users) return "Loding..."
    let filteredUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf._id) // ? allUsers.filter((user) => _.isEqual(user.profession, selectedProf))
        : users
    filteredUsers = filteredUsers
        .filter((item) => {
            return item.name.toLowerCase().includes(searchString.toLowerCase())
        })
        .filter((item) => item._id !== currentUserId)

    const count = filteredUsers.length

    const sortedUsers = _.orderBy(filteredUsers, sortBy.sort, sortBy.order)

    const cropUsers = paginate(sortedUsers, onPage, currentPage)

    const onPageChange = (page) => {
        setCurrentPage(page)
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        resetSearchHadler()
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
            path: "name",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: "Проффесия",
            component: (user) => <Profession id={user.profession} />
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
        }
    }

    const searchHadler = (value) => {
        setSearchString(value)
        clearFilter()
    }
    const resetSearchHadler = () => {
        setSearchString("")
    }

    return (
        <>
            <div className="d-flex">
                {professions && !isProfessionsLoading && (
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
                    <SearchRow value={searchString} onSearch={searchHadler} />
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
        </>
    )
}

export default UserListPage
