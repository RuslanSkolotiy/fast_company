import React from "react"
import Comment from "./comment"
import { useComments } from "../../../hooks/useComments"

const CommentsList = () => {
    const { comments } = useComments()
    const { removeComment } = useComments()
    const onDeleteCommentHandler = (id) => {
        removeComment(id)
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />
                {comments
                    .sort((a, b) => b.created_at - a.created_at)
                    .map((comment) => (
                        <Comment
                            comment={comment}
                            key={comment._id}
                            onDeleteClick={onDeleteCommentHandler}
                        />
                    ))}
            </div>
        </div>
    )
}

CommentsList.propTypes = {}

export default CommentsList
