const TOKEN_KEY = "jwt-token"
const REFRESH_KEY = "jwt-refresh-token"
const EXPIRES_KEY = "jwt-expires"
const USERID_KEY = "user-local-id"

export const setTokens = ({
    refreshToken,
    accessToken,
    userId,
    expiresIn = 3600
}) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
    localStorage.setItem(USERID_KEY, userId)
}

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY)
}

export const getExpiresDate = () => {
    return localStorage.getItem(EXPIRES_KEY)
}

export const getUserId = () => {
    return localStorage.getItem(USERID_KEY)
}

export const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERID_KEY)
}
const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDate,
    getUserId,
    removeAuthData
}

export default localStorageService