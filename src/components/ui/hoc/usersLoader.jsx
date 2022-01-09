import { useDispatch, useSelector } from "react-redux"
import { getDataStatus, loadUsersList } from "../../../store/users"
import { useEffect } from "react"
import PropTypes from "prop-types"

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus())
    const dispatch = useDispatch()
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUsersList())
        }
    }, [])
    if (!dataStatus) return "Loading..."
    return children
}
export default UsersLoader
UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
