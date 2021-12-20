import React, { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

const LogoutPage = () => {
    const { logOut } = useAuth()
    useEffect(() => {
        logOut()
    }, [])
    return <h1>Loading...</h1>
}
export default LogoutPage
