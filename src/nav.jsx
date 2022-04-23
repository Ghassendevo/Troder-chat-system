import React, { useEffect } from "react";
import { useState } from "react";
import { ReactDOM } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as m, faUser, faEnvelopeOpen as envo } from "@fortawesome/free-regular-svg-icons";
import { faArchive as ar } from "@fortawesome/free-solid-svg-icons";

import ov from './chat.png';
import { useDispatch } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";

const signin = () => {
    return {
        type: 'SIGN_IN'
    }
}


const Nav = (props) => {
    const [effDiv, setEffDiv] = useState("hiv_ic")
    const [effDiv2, setEffDiv2] = useState("hic_iv")
    const [effDiv3, setEffDiv3] = useState("hic_iv")
    const [userDataInfo, setUserData] = useState(props.user)
    const dispatch = useDispatch()
    const userimg = require(`C:/Users/ABDELLAOUI GHASSEN/server/Profile_Img/${userDataInfo["username"]}/${userDataInfo["img"]}`)
    const logout = () => {
        dispatch(signin())
        localStorage.removeItem("session")
    }
    const history = useHistory()
    let { path, url } = useRouteMatch();
    const navi = () => {
        history.push({
            pathname: `${path}/Friends`,
        })
    }
    const menui = () => {
        history.push({
            pathname: `${url}`,
        })
    }
    return (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '98vh', width: '5%', borderRight: '1px solid #ebebeb', paddingRight: '7px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90vh', width: '100%', alignItems: 'center', marginTop: '10px', height: '95vh', }}>
                <div style={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'space-between', height: '50vh', }}>
                    <div style={{ height: '10vh', textAlign: 'center' }}>
                        <img src={ov} alt="" width={35} style={{ cursor: 'pointer', }} />
                    </div>
                    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', textAlign: 'center', justifyContent: 'space-between', alignItems: 'center', height: '20vh' }}>
                        <div className={effDiv}>
                            <FontAwesomeIcon onClick={menui} icon={envo} style={{ color: '#007bff', fontSize: '18px' }} />
                        </div>
                        <div className={effDiv2}>
                            <FontAwesomeIcon onClick={navi} className="hic1" icon={faUser} style={{ fontSize: '18px' }} />
                        </div>
                        <div className={effDiv2}>
                            <FontAwesomeIcon className="hic1" icon={ar} style={{ fontSize: '18px' }} />
                        </div>
                    </div>
                </div>
                <div className="hic_iv" >
                    <FontAwesomeIcon className="hic1" icon={m} style={{ fontSize: '18px' }} />
                </div>
                <div>

                    <img className="sess_img" src={userimg.default} alt="" width={40} height={40} />
                </div>
                <div>
                    <button onClick={logout}>Log out</button>
                </div>

            </div>
        </div>




    )
}

export default Nav;