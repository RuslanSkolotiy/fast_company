import React, { useState } from "react"
import Avatar from "../common/avatar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getCurrentUserData } from "../../store/users"

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData())
    const [isOpen, setOpen] = useState(false)
    const toggleMenu = () => {
        setOpen((prevState) => !prevState)
    }
    if (!currentUser) return "Loading"
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <Avatar
                    hash={currentUser.name}
                    width="40"
                    height="40"
                    alt="avatar"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link to={`/logout/`} className="dropdown-item">
                    Log Out
                </Link>
            </div>
        </div>
    )
}
export default NavProfile
