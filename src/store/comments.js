import { createSlice } from "@reduxjs/toolkit"
import commentService from "../services/commentService"
import { nanoid } from "nanoid"

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
        await commentService.delete(commentId)
        dispatch(commentRemoved({ commentId }))
    } catch (error) {
        dispatch(commentRemoveFiled(error.message))
    }
}

export const createComment = (data) => async (dispatch) => {
    const comment = {
        ...data,
        _id: nanoid(),
        created_at: Date.now()
    }

    dispatch(commentCreateRequested())
    try {
        await commentService.update(comment._id, comment)
        dispatch(commentCreated(comment))
    } catch (error) {
        dispatch(commentCreateFiled(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
