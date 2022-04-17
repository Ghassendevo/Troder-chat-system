import React, { useEffect } from "react";
import { ReactDOM } from "react";
import "./troder.css";
import Log_anim from "./log_animation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import Nav from "./nav";
import Menu from "./menu";
import Chat from "./chat_men";
import Prochat from "./Profile_chat";
import Friends from "./friends";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Link,
    Outlet,
} from "react-router-dom";
import { useRouteMatch } from "react-router";
import Chatnew from "./chatNew";
import { useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Lastchat from "./lastchat";
const socket = io.connect("http://localhost:3002")
const signin = () => {
    return {
        type: 'SIGN_IN'
    }
}


const Troder = () => {
    //check if user has no messages
    const send_to = useSelector(state => state.chat)
    var userInfo = localStorage.getItem("userinfo")
    const userInfoData = JSON.parse(userInfo)

    const [isMessage, setIsMessage] = useState()

    const dispatch = useDispatch()
    const logout = () => {
        dispatch(signin())
    }
    const chatId = useSelector(state => state.chat)
    //const [isNew, setisNew] = useState()
    const newUser = useSelector(state => state.newuser)
    const isNew = localStorage.getItem("isNew")
    let { url, path } = useRouteMatch();

    /* useEffect( async () => {
        await axios.post('http://localhost:3001/checkM', {
             id: userInfoData.id
         }).then(res => {
             setIsMessage(res.data)
         })
     },[])*/
    return (


        <div className="troder_main">

            <Nav user={userInfoData} />
            <Switch>

                <Route path={`${path}/Friends`}> <Friends user={userInfoData} /> </Route>
                <Route path="/Troder"> <Menu user={userInfoData} /> </Route>
            </Switch>
            <Route path="/Troder"> <Lastchat user={userInfoData} socket={socket} /> </Route>
            <Switch>
                {
                    isNew ? (

                        <Route path={`${path}/:id`}>
                            <Chatnew  socket={socket} send_to={send_to} />
                        </Route>
                    ) : (


                        <Route path={`${path}`}>
                            <Chat />
                        </Route>
                    )
                }
            </Switch>
            <Prochat />
        </div>

    )
}

const Check = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(signin())
    }
    const isLogged = useSelector(state => state.isLogged)
    const cc = localStorage.getItem("session")
    var userInfo = localStorage.getItem("userinfo")
    const userInfoData = JSON.parse(userInfo)
    useEffect(() => {
        axios.post(`http://localhost:3001/checkm`, {
            userId: userInfoData.id,
        })
    }, [])
    return (
        <div>
            {cc ? <Troder /> : <Redirect to={{ pathname: "/" }} />}

        </div>


    )
}
export default Check;