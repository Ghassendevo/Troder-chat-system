import ReactDOM from "react-dom";
import React from "react";
import "./style.css";
import "./media_style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle, faUser, faMeteor } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from "axios";
import upl from './image.png';
import user_img from './user.png';
import Login from './login.jsx';
import Create from './signup.jsx';
import Profile_img from './profile_img.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect

} from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import App from "./app.jsx";
import Troder from "./troder";
import ProtectedRoute from "./ProtectedRoutes";
import { createStore } from 'redux';
import { create } from "@mui/material/styles/createTransitions";
import { loggedReducer } from "./isLogged";
import { counterReducer } from "./Counter";
import { chatid } from "./chatidRedux";
import { combineReducers, } from 'redux';
import { Provider, useSelector, useDispatch, connect, } from "react-redux";
import { useState } from "react";
import Menu from "./menu.jsx"
import Friends from "./friends";
import newuser from "./newUser";
const allreducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    chat: chatid,
    newuser: newuser
});
const store = createStore(
    allreducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const Main = () => {
    const signin = () => {
        return {
            type: 'SIGN_IN'
        }
    }
    const [loggedIn, setloggedIn] = useState('')
    const isLogged = useSelector(state => state.isLogged)
    const isLoggedd = localStorage.getItem('session')
    const dispatch = useDispatch()
    const history = useHistory();

    return (


        <Router>

            {isLoggedd ? <Redirect to={{ pathname: "/Troder", }} /> : <Redirect to={{
                pathname: "/", state: {
                    prevLocation: '/',
                    error: "You need to login first!",
                },
            }} />}
            <Switch>
                <Route path='/Troder' component={Troder} >
                </Route>
                <Route path='/' component={App} />
            </Switch>

        </Router>

    )
}
ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('root'));
/*<ProtectedRoute
path="/Troder"
loggedIn={isLogged}
component={Troder}
/>*/