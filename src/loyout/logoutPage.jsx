import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { logOut } from "../store/users"

const LogoutPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(logOut())
    }, [])
    return <h1>Loading...</h1>
}
export default LogoutPage
