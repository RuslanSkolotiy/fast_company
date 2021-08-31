import React from "react"
import Bookmark from "./bookmark"
import Qualitie from "./qualitie"
import PropTypes from "prop-types"

const User = ({ user, onDelete, onBookmarkToggle }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Qualitie quality={quality} key={quality._id} />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td className="text-center">
                <Bookmark user={user} onToggle={onBookmarkToggle} />
            </td>
            <td>
                <button
                    onClick={() => {
                        onDelete(user._id)
                    }}
                    data-id={user._id}
                    className="btn btn-danger"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmarkToggle: PropTypes.func.isRequired
}

export default User
