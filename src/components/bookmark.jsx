import React from "react"

const Bookmark = ({ user, onToggle }) => {
  const style = "bi " + (user.marked ? "bi-star-fill" : "bi-star")
  return (
    <i className={style} role="button" onClick={() => onToggle(user._id)}></i>
  )
}

export default Bookmark
