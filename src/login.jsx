
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./media_style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle, faUser, faMeteor, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from "axios";
import upl from './image.png';
import user_img from './login1.jpg';
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { faCheckCircle as icon_success } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle as ex } from "@fortawesome/free-solid-svg-icons";

const signin = () => {
    return {
        type: 'SIGN_IN'
    };
}

const User = () => {
    return (
        <div className="ifuser_true">
            Login success <FontAwesomeIcon icon={icon_success} style={{ color: '#3cb93c', marginLeft: '5px' }} />
        </div>
    )
}
const Notuser = () => {
    return (
        <div className="notuser_true">
            Incorrect Inforamtion <FontAwesomeIcon icon={ex} style={{ color: 'red', marginLeft: '5px' }} />
        </div>
    )
}
const Login = () => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const history = useHistory();
    const dispatch = useDispatch()
    const [userExist, setUserExist] = useState(0);
    const [isLoad, setIsLoad] = useState(false);
    const loggedin = useSelector(state => state.isLogged)
    const [color, setColor] = useState('#3d83f2');
    const login = () => {
        const data = {
            username: user,
            password: pass
        }
        if (user !== '' && pass !== '') {
            setIsLoad(true)
            setColor('#1d5589;')
            axios.post(`http://localhost:3001/login`, {
                data: data,
            }).then(res => {
                if (res.data.message == true) {
                    const userinfo = res.data.userinfo
                    let isNew = res.data.isNew
                    localStorage.setItem('isNew', isNew)
                    localStorage.setItem('userinfo', userinfo)
                    localStorage.setItem('session', true)
                    /* window.location.push({
                         pathname:'/Troder',
                     });*/
                    setUserExist(true);
                    dispatch(signin())

                } else {
                    setUserExist(2);
                    setIsLoad(false)
                    setUser('')
                    setPass('')
                    setTimeout(() => {
                        setUserExist(0);
                    }, 3000);

                }
            })
        } else {
            alert("Insert your information")
        }
        /*
         dispatch(signin())
         
        /* window.location.reload(false);
         */
    }
    return (
        <>
            <div className="main_login">
                <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ width: '60%', textAlign: 'left' }}>
                        <h4 style={{ textAlign: 'left' }}>Login</h4>
                        <p style={{ textAlign: 'left', color: 'rgba(128, 128, 128, 0.55)' }}>See the world , login now , see friend and make it run</p>
                        <div className="input_div">
                            <input value={user} onChange={(e) => setUser(e.target.value)} type="text" className="inputt" placeholder="Your username" />
                        </div>
                        <br />
                        <div className="input_div">
                            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" className="inputt" placeholder="Your password" />
                        </div>
                        <br />
                        <button onClick={login} className="login_btne" type="submit" style={{ backgroundColor: color }}>
                            {isLoad ? <CircularProgress color="inherit" size={35} /> : <><p>Se connecter <FontAwesomeIcon icon={faUser} /> </p> </>}

                        </button>

                        <br />
                        <div style={{ marginTop: '10px' }}>
                            <a className="forgetpass" onClick={() => history.push({
                                pathname: '/password',
                            })}>Forget password ?</a>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={user_img} style={{ width: '300px', height: '300px', textAlign: 'center' }} />
                    </div>
                </div>
            </div>

            {userExist == 1 ? <User /> : userExist == 2 ? <Notuser /> : null}

        </>

    )
}


export default Login;