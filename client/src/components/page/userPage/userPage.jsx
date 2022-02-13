import React from "react"
import PropTypes from "prop-types"
import { useHistory } from "react-router"
import UserCard from "../../ui/userCard"
import QualitiesCard from "../../ui/qualitiesCard"
import MeetingsCard from "../../ui/meetingsCard"
import { CommentsList, NewCommentForm } from "../../ui/comments"
import { getUserById } from "../../../store/users"
import { useSelector } from "react-redux"

const UserPage = ({ id }) => {
    const user = useSelector(getUserById(id))
    const history = useHistory()

    const editUserHandle = () => {
        history.push("/users/" + id + "/edit")
    }

    if (!user) return <>Loading...</>

    return (
        <>
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            user={user}
                            onEditUserClick={editUserHandle}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard
                            completedMeetings={user.completedMeetings}
                        />
                    </div>

                    <div className="col-md-8">
                        <NewCommentForm pageId={id} />
                        <CommentsList pageId={id} />
                    </div>
                </div>
            </div>
        </>
    )
}
UserPage.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default UserPage
