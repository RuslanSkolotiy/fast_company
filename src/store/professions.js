import { createSlice } from "@reduxjs/toolkit"
import professionService from "../services/professionService"

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
            state.lastFetch = Date.now()
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})
const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceived, professionsRequestFiled } =
    actions

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 100) return true
    return false
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.fetchAll()
            dispatch(professionsReceived(content))
        } catch (error) {
            dispatch(professionsRequestFiled(error.message))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading

export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((item) => item._id === id)
    }
    return undefined
}
export default professionsReducer
