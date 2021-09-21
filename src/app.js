import React from "react"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import MainPage from "./components/loyout/mainPage"
import LoginPage from "./components/loyout/loginPage"
import UsersPage from "./components/loyout/usersPage"
import MainMenu from "./components/mainMenu"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <MainMenu />
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/users/:userID?" component={UsersPage} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default App
