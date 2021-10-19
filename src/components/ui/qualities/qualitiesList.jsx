import React from "react"
import PropTypes from "prop-types"
import Qualitie from "./qualitie"

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((quality) => (
                <Qualitie quality={quality} key={quality._id} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
