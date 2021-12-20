import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { toast } from "react-toastify"
import axios from "axios"
import userService from "../services/userService"
import localStorageService, { setTokens } from "../services/localStorageService"
import { useHistory } from "react-router-dom"

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const signUp = async ({ email, password, ...rest }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser(data.localId, {
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            })
        } catch (e) {
            errorCatcher(e)
            const { code, message } = e.response.data.error
            switch (code) {
                case 400:
                    if (message === "EMAIL_EXISTS") {
                        const errorObject = {
                            email: "Пользователь с таким email уже существует"
                        }
                        throw errorObject
                    }
                    break
            }
        }
    }

    const prepareThrowError = (message) => {
        const errorObject = {
            error: message
        }
        return errorObject
    }

    const signIn = async ({ email, password }) => {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await getUserData()
        } catch (e) {
            errorCatcher(e)
            const { message } = e.response.data.error

            switch (true) {
                case message === "EMAIL_NOT_FOUND":
                case message === "INVALID_PASSWORD":
                    throw prepareThrowError("Пароль или email неверный")
                case message === "USER_DISABLED":
                    throw prepareThrowError(
                        "Учетная запись пользователя отключена администратором"
                    )
                case message.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER"):
                    throw prepareThrowError(
                        "Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже."
                    )
                default:
                    throw prepareThrowError("Неизвесная ошибка")
            }
        }
    }
    const logOut = function () {
        localStorageService.removeAuthData()
        setCurrentUser(null)
        history.push("/")
    }

    const updateUser = async (data) => {
        try {
            const { content } = await userService.update(data._id, data)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        }
    }

    const createUser = async (id, data) => {
        try {
            const { content } = await userService.update(id, data)
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setCurrentUser(content)
        } catch (e) {
            errorCatcher(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(async () => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        } else {
            setLoading(false)
        }
    }, [])
    useEffect(() => {
        if (error !== null) toast(error)
        setError(null)
    }, [error])

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, currentUser, logOut, updateUser }}
        >
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
