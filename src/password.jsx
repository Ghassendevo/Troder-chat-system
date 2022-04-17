import React from "react";
import { ReactDOM } from "react";
import "./style.css";
import final from "./final.jpg"
import TextField from '@mui/material/TextField';
import axios from "axios";
import { faExclamationCircle as err } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle as succ, faLongArrowAltLeft as arr } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

class Pass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            msg: '',
            type: '',
        }
    }
    
    reset = () => {
      
        var
            username = this.state.username,
            password = this.state.password;
        const data = {
            username: username,
            password: password
        }
        if (username !== '' && password !== '') {
            if (password.length < 5) {
                alert("Password must be more then 5")
            } else {
                axios.post(`http://localhost:3001/reset`, {
                    data: data
                })
                    .then(res => {
                        const msg = res.data.message;
                        this.setState({ msg: msg })
                        this.setState({ type: res.data.type })

                        if(this.state.type=='succ'){
                           
                           setTimeout(() => {
                            this.props.history.push({
                                pathname:'/',
                            })
                           },1000 );
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
    render() {
        return (
            <>
                <div className="main_create">
                    <div className="in_pass">
                        <div style={{ lineHeight: '3px', textAlign: 'left' }}>
                            <FontAwesomeIcon icon={arr} style={{fontSize:'30px',cursor:'pointer'}} onClick={() => this.props.history.push({pathname:'/'})} />
                            <h4 style={{ fontWeight: '600', letterSpacing: '1px', textAlign: 'left' }}>Reset password</h4>
                            <p style={{ color: '#8080808c' }}>Forgot your password ? reset it with easy step</p>


                            <TextField
                                id="filled-required"
                                label="Username"
                                variant="filled"
                                style={{ width: '100%', marginTop: '20px' }}
                                onChange={evt => this.setState({ username: evt.target.value })}
                            />
                            <TextField
                                id="filled-required"
                                label="New password"
                                variant="filled"
                                style={{ width: '100%', marginTop: '20px' }}
                                onChange={evt => this.setState({ password: evt.target.value })}
                            />
                            <button className="button_pass" onClick={this.reset}>
                                Reset password
                            </button>
                        </div>
                        <div>
                            <img src={final} width={300} height={280} />
                        </div>
                    </div>

                </div>
                {
                    this.state.msg !== '' ? <div className="serv_msg">
                        <p>{this.state.msg}</p>  {this.state.type == 'succ' ? <FontAwesomeIcon icon={succ} style={{ color: '#32af19', marginLeft: '10px' }} /> : <FontAwesomeIcon icon={err} style={{ color: 'red', marginLeft: '10px' }} />}
                    </div> : null
                    
                    
                }
            </>

        )
    }
}
export default Pass;