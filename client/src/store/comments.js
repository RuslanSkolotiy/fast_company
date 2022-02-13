import { createSlice } from "@reduxjs/toolkit"
import commentService from "../services/commentService"

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentRemoveRequested: (state, action) => {},
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (item) => item._id !== action.payload.commentId
            )
        },
        commentRemoveFiled: (state, action) => {
            state.error = action.payload
        },
        commentCreateRequested: () => {},
        commentCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        commentCreateFiled: (state, action) => {
            state.error = action.payload
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentRemoveRequested,
    commentRemoved,
    commentRemoveFiled,
    commentCreateRequested,
    commentCreated,
    commentCreateFiled
} = actions

export const loadCommentsList = (pageId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.fetchByPage(pageId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentRemoveRequested())
    try {
        const { content } = await commentService.delete(commentId)
        if (!content) {
            dispatch(commentRemoved({ commentId }))
        }
    } catch (error) {
        dispatch(commentRemoveFiled(error.message))
    }
}

export const createComment = (comment) => async (dispatch) => {
    dispatch(commentCreateRequested())
    try {
        const { content: newComment } = await commentService.create(comment)
        dispatch(commentCreated(newComment))
    } catch (error) {
        dispatch(commentCreateFiled(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
