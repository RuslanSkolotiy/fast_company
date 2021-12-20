import React from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import MainPage from "./loyout/mainPage"
import LoginPage from "./loyout/loginPage"
import UsersPage from "./loyout/usersPage"
import MainMenu from "./components/ui/mainMenu"
import { ToastContainer } from "react-toastify"
import { ProfessionProvider } from "./hooks/useProfessions"

import { QualitiesProvider } from "./hooks/useQualities"
import { AuthProvider } from "./hooks/useAuth"
import "react-toastify/dist/ReactToastify.css"
import ProtectedRoute from "./components/common/protectedRoute"
import LogoutPage from "./loyout/logoutPage"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <MainMenu />
                    <Switch>
                        <Route path="/" exact component={MainPage} />
                        <QualitiesProvider>
                            <ProfessionProvider>
                                <Route
                                    path="/login/:type?"
                                    component={LoginPage}
                                />
                                <Route path="/logout" component={LogoutPage} />

                                <ProtectedRoute
                                    path="/users/:userID?/:edit?"
                                    exact={true}
                                    component={UsersPage}
                                />
                            </ProfessionProvider>
                        </QualitiesProvider>
                    </Switch>
                </AuthProvider>
                <ToastContainer />
            </BrowserRouter>
        </>
    )
}

export default App
