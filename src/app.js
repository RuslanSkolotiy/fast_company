import React from "react"
import { Switch, Route, Router } from "react-router-dom"
import MainPage from "./loyout/mainPage"
import LoginPage from "./loyout/loginPage"
import UsersPage from "./loyout/usersPage"
import MainMenu from "./components/ui/mainMenu"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/common/protectedRoute"
import LogoutPage from "./loyout/logoutPage"

import history from "./utils/history"
import AppLoader from "./components/ui/hoc/appLoader"

const App = () => {
    return (
        <>
            <Router history={history}>
                <AppLoader>
                    <MainMenu />
                    <Switch>
                        <Route path="/" exact component={MainPage} />

                        <Route path="/login/:type?" component={LoginPage} />
                        <Route path="/logout" component={LogoutPage} />

                        <ProtectedRoute
                            path="/users/:userID?/:edit?"
                            exact={true}
                            component={UsersPage}
                        />
                    </Switch>
                </AppLoader>
                <ToastContainer />
            </Router>
        </>
    )
}

export default App
