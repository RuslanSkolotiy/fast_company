import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professions"

const Profession = ({ id }) => {
    const profession = useSelector(getProfessionById(id))
    const isLoading = useSelector(getProfessionsLoadingStatus())

    return !isLoading ? profession.name : "Loading..."
}
Profession.propTypes = {
    id: PropTypes.string
}
export default Profession
