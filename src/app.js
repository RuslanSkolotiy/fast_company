import React from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import MainPage from "./loyout/mainPage"
import LoginPage from "./loyout/loginPage"
import UsersPage from "./loyout/usersPage"
import MainMenu from "./components/ui/mainMenu"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <MainMenu />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login/:type?" component={LoginPage} />
                    <Route
                        path="/users/:userID/edit"
                        component={() => UsersPage({ mode: "edit" })}
                    />
                    <Route
                        path="/users/:userID"
                        component={() => UsersPage({ mode: "view" })}
                    />
                    <Route
                        path="/users/"
                        component={() => UsersPage({ mode: "list" })}
                    />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
