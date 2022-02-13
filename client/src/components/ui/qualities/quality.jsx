import React from "react"
import PropTypes from "prop-types"

const Quality = ({ quality }) => {
    const style = ["badge", "m-1", "bg-" + quality.color].join(" ")
    return <span className={style}>{quality.name}</span>
}

Quality.propTypes = {
    quality: PropTypes.object.isRequired
}

export default Quality
