import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { useAuth } from "./useAuth"
import { nanoid } from "nanoid"
import commentService from "../services/commentServise"
import { toast } from "react-toastify"

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const { userID } = useParams()
    const { currentUser } = useAuth()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        getComments()
    }, [userID])

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userID,
            userId: currentUser._id,
            created_at: Date.now()
        }
        try {
            const { content } = await commentService.update(
                comment._id,
                comment
            )
            setComments((prevState) => [...prevState, content])
        } catch (e) {
            errorCatcher(e)
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.fetchByPage(userID)
            setComments(content)
        } catch (e) {
            errorCatcher(e)
        } finally {
            setLoading(false)
        }
    }

    async function removeComment(commentId) {
        try {
            const { content } = await commentService.delete(commentId)
            if (content === null) {
                setComments((prevState) =>
                    prevState.filter((comment) => comment._id !== commentId)
                )
            }
        } catch (e) {
            errorCatcher(e)
        }
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentsContext.Provider>
    )
}

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
