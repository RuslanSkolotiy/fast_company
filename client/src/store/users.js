import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/userService"
import authService from "../services/authService"
import localStorageService, { setTokens } from "../services/localStorageService"
import history from "../utils/history"
import { generateAuthError } from "../utils/generateAuthError"

const initialState = {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
}
if (localStorageService.getAccessToken()) {
    initialState.auth = { userId: localStorageService.getUserId() }
    initialState.isLoggedIn = true
    initialState.isLoading = true
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true
        },
        usersReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.dataLoaded = true
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequested: (state) => {
            state.error = null
        },
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload }
            state.isLoggedIn = true
        },
        authRequestFiled: (state, action) => {
            state.error = action.payload
        },
        userUpdateRequested: () => {},
        userUpdated: (state, action) => {
            const index = state.entities.findIndex(
                (item) => item._id === action.payload._id
            )
            if (index !== -1) {
                state.entities[index] = action.payload
            }
        },
        userUpdateFiled: (state, action) => {
            state.error = action.payload
        },
        userLoggedOut: (state) => {
            state.entities = null
            state.isLoggedIn = false
            state.auth = null
            state.dataLoaded = false
        }
    }
})

const { reducer: usersReducer, actions } = userSlice
const {
    usersRequested,
    usersReceived,
    usersRequestFiled,
    authRequested,
    authRequestSuccess,
    authRequestFiled,
    userLoggedOut,
    userUpdateRequested,
    userUpdated,
    userUpdateFiled
} = actions

export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.update(payload._id, payload)
        dispatch(userUpdated(content))
    } catch (error) {
        dispatch(userUpdateFiled(error.message))
    }
}
export const login = ({ payload, redirect }) => {
    return async (dispatch) => {
        const { email, password } = payload
        dispatch(authRequested())
        try {
            const data = await authService.login({ email, password })
            setTokens(data)
            dispatch(authRequestSuccess({ userId: data.userId }))
            history.push(redirect)
        } catch (error) {
            const { code, message } = error.response.data.error
            if (code === 400) {
                const errorMessage = generateAuthError(message)
                dispatch(authRequestFiled(errorMessage))
            } else {
                dispatch(authRequestFiled(error.message))
            }
        }
    }
}

export const signUp = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(authRequested())
            const data = await authService.register(payload)
            setTokens(data)
            dispatch(authRequestSuccess({ userId: data.userId }))
            history.push("/users")
        } catch (error) {
            dispatch(authRequestFiled(error.message))
        }
    }
}

export const logOut = () => {
    return async (dispatch) => {
        localStorageService.removeAuthData()
        history.push("/")
        dispatch(userLoggedOut())
    }
}

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested())
    try {
        const { content } = await userService.fetchAll()
        dispatch(usersReceived(content))
    } catch (error) {
        dispatch(usersRequestFiled(error.message))
    }
}

export const getUsers = () => (state) => state.users.entities
export const getUsersLoadingStatus = () => (state) => state.users.isLoading

export const getUserById = (id) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((item) => item._id === id)
    }
    return undefined
}
export const getIsLoggedIn = () => (state) => {
    return state.users.isLoggedIn
}
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getCurrentUserId = () => (state) => state.users.auth.userId
export const getCurrentUserData = () => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(
            (item) => item._id === state.users.auth.userId
        )
    }
    return undefined
}
export const getAuthError = () => (state) => state.users.error

export default usersReducer
