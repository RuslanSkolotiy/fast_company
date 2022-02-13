import React, { useEffect } from "react"
import Comment from "./comment"
import { useDispatch, useSelector } from "react-redux"
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../../store/comments"
import PropTypes from "prop-types"

const CommentsList = ({ pageId }) => {
    const dispatch = useDispatch()
    const comments = useSelector(getComments())
    const isLoading = useSelector(getCommentsLoadingStatus())

    const onDeleteCommentHandler = (id) => {
        dispatch(removeComment(id))
    }

    useEffect(() => {
        dispatch(loadCommentsList(pageId))
    }, [pageId])

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {!isLoading &&
                    [...comments]
                        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                        .map((comment) => (
                            <Comment
                                comment={comment}
                                key={comment._id}
                                onDeleteClick={onDeleteCommentHandler}
                            />
                        ))}
                {isLoading && "Loading..."}
            </div>
        </div>
    )
}

CommentsList.propTypes = {
    pageId: PropTypes.string
}

export default CommentsList
