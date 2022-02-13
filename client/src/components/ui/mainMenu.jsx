import React from "react"
import { NavLink } from "react-router-dom"
import NavProfile from "./navProfile"
import { useSelector } from "react-redux"
import { getIsLoggedIn } from "../../store/users"

const MainMenu = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            exact
                            className="nav-link"
                            activeClassName="active"
                        >
                            Main
                        </NavLink>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <NavLink
                                to="/users"
                                className="nav-link"
                                activeClassName="active"
                            >
                                Users
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn && <NavProfile />}
                    {!isLoggedIn && (
                        <NavLink
                            to="/login"
                            className="nav-link"
                            activeClassName="active"
                        >
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default MainMenu
