import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactDOM } from "react";
import phone from "./phone-call.png"
import video from "./zoom.png"
import dots from "./more.png"
import send from "./send.png"
const Lastchat = ({ user, socket }) => {
    //get last messages for last user
    const [userMess, setuserMess] = useState([])
    const [userInfo, setuserInfo] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [sockeMessages, setsocketMessages] = useState([])

    useEffect(() => {
        axios.post('http://localhost:3001/lastChat', {
            auth_id: user.id
        }).then(res => {
            setuserInfo(res.data.userId)
            setuserMess(res.data.message)
            setisLoading(false)
        }).catch(err => {
            throw err;
        })
    }, [])
    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setsocketMessages((list) => [...list, data])
        })
    }, [socket])
    const [msg, setMsg] = useState("");


    const sendMsg = () => {
        if (msg !== "") {
            const data = {
                msg_from: userInfo.id,
                msg_to: userMess.id,
                msg: msg,
                time:
                    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            // send socket message:
            socket.emit("send_message", data)
            //
            //upadte message to data base

            axios.post(`http://localhost:3001/sendM`, {
                data: data,
            }).then(res => {
                setMsg("")
            }).catch(err => {
                alert("Check your connection")
            })
            //
        }
    }
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ width: "70%", backgroundColor: "", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                    <div style={{ width: '100%', backgroundColor: '', height: '100px', borderBottom: '1px solid #ebebeb' }}>
                        <div style={{ backgroundColor: '', width: '90%', display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px' }}>
                            <div style={{ display: 'flex', backgroundColor: '', width: '20%' }}>
                                <div style={{ backgroundColor: '', display: 'flex', alignItems: 'center' }}>
                                    {
                                        isLoading ? (
                                            <p>Loading</p>
                                        ) : <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${userInfo.username}/${userInfo.img}`).default} width={40} style={{ borderRadius: '50%' }} height={40} alt="" />
                                    }
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '', height: '50px', lineHeight: '1px', marginLeft: '20px', }}>
                                    <h4 style={{ marginTop: '12px', fontFamily: 'arial' }}>{userInfo.firstname + " " + userInfo.lastname}</h4>
                                    <p style={{ marginTop: '-1px', fontFamily: 'arial', fontSize: '12px', color: 'green' }}>Typing...</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '25%' }}>
                                <div className="fea">
                                    <img src={phone} width={18} alt="" />
                                </div>
                                <div className="fea">
                                    <img src={video} width={18} alt="" />
                                </div>
                                <div className="fea">
                                    <img src={dots} width={15} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '', display: 'flex', height: '70vh', overflow: 'hidden', borderBottom: '1px solid #ebebebf1', overflowY: 'scroll' }}>
                        <div style={{ marginTop: '10px', height: '97%', width: '100%', backgroundColor: '' }}>
                            {
                                userMess.map((mes, i) => {
                                    if (mes.msg_from == userInfo.id) {
                                        return (
                                            <div style={{ marginBottom: '20px', }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '', width: '98%', marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '', marginLeft: 'auto', marginRight: '0' }}>
                                                            <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${userInfo.username}/${userInfo.img}`).default} width={40} height={40} style={{ borderRadius: '50%' }} alt="" />
                                                        </div>
                                                        <div style={{ background: '', marginLeft: '15px', display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: '', lineHeight: '0px' }}>
                                                            <h4 style={{ fontFamily: 'arial', fontWeight: '500', marginTop: '10px' }}>{userInfo.firstname + " " + userInfo.lastname}</h4>
                                                            <p style={{ fontSize: '12px', fontFamily: 'arial', margin: '0', textAlign: 'left' }}>11:15</p>
                                                        </div>
                                                        <div style={{ backgroundColor: '', marginTop: '20px', textAlign: 'right' }}>
                                                            <div style={{ backgroundColor: '#0a80ff', maxWidth: '50%', display: 'inline-block', alignItems: 'center', paddingRight: '8px', paddingLeft: '8px', borderRadius: '7px', overflow: 'hidden' }}>
                                                                <p style={{ marginLeft: '', fontSize: '14px', fontFamily: 'arial', color: 'white', textAlign: 'left' }}>
                                                                    {mes.msg}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div style={{ marginBottom: '30px', backgroundColor: '', paddingBottom: '10px' }}>

                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '', width: '98%', marginLeft: 'auto', marginRight: 'auto', }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', }}>
                                                            <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${user.username}/${user.img}`).default} width={40} height={40} style={{ borderRadius: '50%' }} alt="" />
                                                        </div>
                                                        <div style={{ background: '', marginLeft: '15px', display: 'flex', flexDirection: 'column', alignItems: '', lineHeight: '0px', textAlign: 'left' }}>
                                                            <h4 style={{ fontFamily: 'arial', fontWeight: '500', marginTop: '10px' }}>{user.firstname + " " + user.lastname}</h4>
                                                            <p style={{ fontSize: '12px', fontFamily: 'arial', margin: '0', textAlign: 'left' }}>11:15</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: '', marginTop: '20px' }}>
                                                        <div style={{ backgroundColor: '#ebebeb', maxWidth: '50%', display: 'inline-block', alignItems: 'center', paddingRight: '8px', paddingLeft: '8px', borderRadius: '7px' }}>
                                                            <p style={{ marginLeft: '', fontSize: '14px', fontFamily: 'arial' }}>
                                                                {mes.msg}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                sockeMessages.map((item, i) => {

                                    if (item.msg_from == user.id && item.msg_to == userInfo.id) {
                                        return (
                                            <div style={{ marginBottom: '30px', backgroundColor: '', paddingBottom: '10px' }}>

                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '', width: '98%', marginLeft: 'auto', marginRight: 'auto', }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', }}>
                                                            <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${userInfo.username}/${userInfo.img}`).default} width={40} height={40} style={{ borderRadius: '50%' }} alt="" />
                                                        </div>
                                                        <div style={{ background: '', marginLeft: '15px', display: 'flex', flexDirection: 'column', alignItems: '', lineHeight: '0px', textAlign: 'left' }}>
                                                            <h4 style={{ fontFamily: 'arial', fontWeight: '500', marginTop: '10px' }}>{userInfo.firstname + " " + user.lastname}</h4>
                                                            <p style={{ fontSize: '12px', fontFamily: 'arial', margin: '0', textAlign: 'left' }}>{item.time}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: '', marginTop: '20px' }}>
                                                        <div style={{ backgroundColor: '#ebebeb', maxWidth: '50%', display: 'inline-block', alignItems: 'center', paddingRight: '8px', paddingLeft: '8px', borderRadius: '7px' }}>
                                                            <p style={{ marginLeft: '', fontSize: '14px', fontFamily: 'arial' }}>
                                                                {item.msg}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }
                                    if (item.msg_from == userInfo.id && item.msg_to == user.id) {
                                        return (
                                            <div style={{ marginBottom: '20px', }}>

                                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '', width: '98%', marginLeft: 'auto', marginRight: 'auto' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '', marginLeft: 'auto', marginRight: '0' }}>
                                                            <img src={require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${userInfo.username}/${userInfo.img}`).default} width={40} height={40} style={{ borderRadius: '50%' }} alt="" />
                                                        </div>
                                                        <div style={{ background: '', marginLeft: '15px', display: 'flex', flexDirection: 'column', textAlign: 'left', alignItems: '', lineHeight: '0px' }}>
                                                            <h4 style={{ fontFamily: 'arial', fontWeight: '500', marginTop: '10px' }}>{userInfo.firstname + " " + userInfo.lastname}</h4>
                                                            <p style={{ fontSize: '12px', fontFamily: 'arial', margin: '0', textAlign: 'left' }}>{item.time}</p>
                                                        </div>
                                                    </div>
                                                    <div style={{ backgroundColor: '', marginTop: '20px', textAlign: 'right' }}>
                                                        <div style={{ backgroundColor: '#0a80ff', maxWidth: '50%', display: 'inline-block', alignItems: 'center', paddingRight: '8px', paddingLeft: '8px', borderRadius: '7px', overflow: 'hidden' }}>
                                                            <p style={{ marginLeft: '', fontSize: '14px', fontFamily: 'arial', color: 'white', textAlign: 'left' }}>
                                                                {item.msg}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                    }

                                })
                            }
                        </div>
                    </div>
                    <div style={{ backgroundColor: '', height: '100px' }}>
                        <div style={{ marginTop: '20px', backgroundColor: '', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                            <input id="in" onChange={(event) => setMsg(event.target.value)} autoCorrect="false" autoCapitalize="" name="in" type="text" placeholder="Write a message" className="sendIput" />
                            <button onClick={sendMsg} className="sendbutton"> <img src={send} width={25} alt="" /></button>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}
export default Lastchat;