import React from "react";
import { ReactDOM } from "react";
import friends from "./friends.png"
import newchat from "./newchat.png"
import ghassen from "./ghassen.jpeg"
import { Link } from "react-router-dom";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Chatnew from "./chatNew";
import Chat from "./chat_men";
import { BrowserRouter as Router, Route, Switch, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import newuser from "./newUser";

const Menu = (props) => {
    const { params } = useParams();
    const [userDataInfo, setUserData] = useState(props.user)
    const [userMessage, setUserMessage] = useState([])
    const [finalListMessage, setFinalListMessage] = useState([])
    const [stateid, setstateId] = useState('')
    const [userNew, setUserNew] = useState()
    const [Allmsg, setAllmsg] = useState([])
    let { url, path } = useRouteMatch();
    const history = useHistory()
    const chatId = useSelector(state => state.chatid)
    const dispatch = useDispatch()
    const [isLoading, setisLoading] = useState(true)
    const dispNew = () => {
        return {
            type: 'NEW'
        }
    }
    const use = useEffect(async () => {
        const data = await axios.post(`http://localhost:3001/getMenuMessage`, {
            user_id: userDataInfo["id"]
        }).then(res => {
            setUserMessage(res.data.messages)
            setFinalListMessage(res.data.info)
            setAllmsg(res.data.Allmsg.reverse())
            setisLoading(false)
            const ms = res.data.messages
            if (ms) {
                if (ms.length > 0) {
                    dispatch(dispNew(dispNew()))
                }
            }
        })
    }, [])

    const Mes = (props) => {
        const chate = (e) => {
            return {
                type: 'CHAT',
                payload: e,
            };
        }
        const dispNew = () => {
            return {
                type: 'NEW'
            }
        }
        const chatId = useSelector(state => state.chat)
        const dispatch = useDispatch()
        const newUser = useSelector(state => state.newuser)
      

        return (

            isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {
                        userMessage !== undefined ? (
                            userMessage.map((item, i) => {

                                //const user_img = require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${item.username}/${item.img}`)
                                const itemget = () => {
                                    setstateId(item.msg_from)
                                    dispatch(chate(item.msg_from))
                                    history.push({
                                        pathname: `/Troder/${item.msg_from}`,
                                    })
                                }
                                if (item.msg_from != userDataInfo.id) {
                                    return (

                                        <div className="list_chats" key={i} id={i} onClick={itemget} >
                                            <div style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '65%', height: '10vh' }}>
                                                    {
                                                        finalListMessage.map((check, key) => {
                                                            if (check.id == item.msg_from) {
                                                                return (
                                                                    <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${check.username}/${check.img}`).default} width={40} style={{ borderRadius: '50%' }} height={40} alt="" />
                                                                )
                                                            }
                                                        })
                                                    }
                                                    <div style={{ height: '10vh', lineHeight: '0.2em', verticalAlign: 'top', width: '70%' }}>
                                                        <h4 style={{ fontFamily: 'arial', fontWeight: '500', }}>
                                                            {finalListMessage.map((list, j) => {
                                                                if (list.id == item.msg_from) {
                                                                    return (
                                                                        <div>
                                                                            {list.firstname + " " + list.lastname}
                                                                        </div>
                                                                    )
                                                                }
                                                            })}
                                                        </h4>
                                                        <p style={{ color: 'gray', width: "200px", fontFamily: 'arial', overflow: 'ellipsis', }}>{
                                                       item.msg
                                                        }</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p style={{ color: 'gray', fontFamily: 'arial', fontSize: '13px' }}>{item.time}</p>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                }

                            })
                        ) : (
                            <p>There are no messages, please start conversation</p>
                        )
                    }
                </div>
            )

        )


    }


    return (
        <>
            <div className="troder_menu" >

                <div style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                    <div style={{ height: '50px', display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontSize: '22px', fontWeight: '600', fontFamily: 'Arial, verdana' }} >Chat</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', height: '50px', alignItems: 'center' }}>
                        <div className="out_hov">
                            <img src={friends} width={20} alt="" />
                        </div>
                        <div className="out_hov">
                            <img src={newchat} width={20} alt="" />
                        </div>
                    </div>
                </div>
                <div style={{ width: '85%', marginRight: 'auto', marginLeft: 'auto' }}>
                    <div className="search_friends">
                        <input type="text" className="search_friendss" placeholder="Search chats" />
                    </div>
                </div>
                <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px', height: '73vh', overflowX: 'hidden', overflowY: 'scroll' }}>



                    <Mes />

                </div>
            </div>



        </>
    )
}

export default Menu;