import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./media_style.css";
import middle from './middle.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeetup } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle, faUser, faMeteor } from '@fortawesome/free-solid-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from "axios";
import upl from './image.png';
import user_img from './user.png';
import img from './image.png';
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import Profile_img from "./profile_img";

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upload_img: 'none',
            handle_img: 'undone',
            file: null,
            fileName: null,
            fili: null,
            isImg: false,
            u: 'none',
            isDisplay: 'none',
            isDisplaye: 'block',
            isCheck: false,
            create: {
                firstname: 'e',
                lastnamme: 'e',
                username: 'e',
                class: 'e',
                password: 'e',
            },
            spinner: 'none',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // code here
    }
    navigate = () => {
        this.props.history.push({
            pathname: '/',
        });
    }
    handleChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
        this.setState({
            fileName: event.target.files[0]
        })
        this.setState({
            fili: event.target.files[0].name
        })
        this.setState({
            isImg: true
        })
    }
    cancel = () => {
        this.setState({ isImg: false });
    }
    skip = () => {
        this.props.history.push({
            pathname: '/Troder',
        })
        window.location.reload(false);
    }
    done = () => {
        const data = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            u_class: this.state.class,
            password: this.state.password,
        };
        var username = this.state.username;
        const formData = new FormData();
        formData.append("file", this.state.fileName);
        formData.append("username", JSON.stringify(data));
        axios.post("http://localhost:3001/uploadimg", formData, {
            headers: { "Content-type": "multipart/form-data" }
        }).then(res => {
            console.log(res);
        })
        

    }
    back = () =>{
        this.setState({ isDisplaye: 'block' });
        this.setState({ isDisplay: 'none' });
    }
    create_account = () => {

        var
            firstname = this.state.firstname,
            lastname = this.state.lastname,
            username = this.state.username,
            password = this.state.password;

        if (typeof (firstname) !== 'undefined' && typeof (lastname) !== 'undefined' && typeof (username) !== 'undefined' && typeof (password) !== 'undefined') {
            var
                nameRegex = /^[a-zA-Z\-]+$/,
                usernameRegex = /^[a-zA-Z0-9]+$/;

            var
                validfirst = firstname.match(nameRegex),
                validlast = lastname.match(nameRegex),
                validusername = username.match(usernameRegex);
            var check = 1;
            if (firstname.length < 15) {
                if (validfirst == null) {
                    alert("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
                    check = 0;
                }
            } else {
                alert('Firstname must be less then 15 character');
                check = 0;
            }
            if (lastname.length < 15) {
                if (validlast == null) {
                    alert("Your last name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
                    check = 0;
                }
            } else {
                alert('Firstname must be less then 15 character');
                check = 0;
            }
            if (validusername == null) {
                alert("Your username is not valid. must contains numbers.");
                check = 0;
            }
        } else {
            /*alert("PLease fill in the blancks");*/
        }
        //Post data;
        if (check == 1) {

            this.setState({ isCheck: true })
            this.setState({ hidden: 'none' });
            this.setState({ spinner: 'flex' });
            setInterval(() => {
                this.setState({ hidden: 'flex' });
                this.setState({ spinner: 'none' });
            }, 1000);
            const data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                u_class: this.state.class,
                password: this.state.password,
            };
            const user = JSON.stringify(data);
            axios.post(`http://localhost:3001/tasks`, {
                data: data
            })
                .then(res => {
                    var fetch = res.data;
                    if (fetch == "0") {
                        alert('Username is already exist,please try another!');
                    } else {
                        this.setState({ upload_img: 'block' });
                        this.setState({ ldisplay: 'none' });
                        this.setState({ sdisplay: 'none' });
                        this.setState({ isDisplaye: 'none' });
                        this.setState({ isDisplay: 'block' });
                        this.setState({ spinner: 'block' });
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }
    render() {
        return (
            <>
                <div className="main_create" style={{ display: this.state.isDisplaye }}>
                    <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95%' }}>
                        <h3 style={{ textAlign: 'left', }}>Create New</h3>
                        <p style={{ color: 'gray',textAlign:'left', }}>Create accout easly with one step</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <input className="create_input" type="text" placeholder="Your Firstname" required onChange={evt => this.setState({ firstname: evt.target.value })} />
                            <input className="create_input" placeholder="Your Lastname" required onChange={evt => this.setState({ lastname: evt.target.value })} />
                        </div><br />
                        <input className='input_create' type="text" placeholder="Your Username" onChange={evt => this.setState({ username: evt.target.value })} />
                        <br /><br />
                        <input className='input_create' type="password" placeholder="Your Password" onChange={evt => this.setState({ password: evt.target.value })} />
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>

                            <a className='back_login' onClick={this.navigate}>already have an account</a>
                            <a className="next" onClick={this.create_account}>Next</a>
                        </div>
                    </div>

                </div>
                <div style={{ display: this.state.isDisplay }}>
                    <div className='main_profile'>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '90%' }}>
                            <h3>Choose an image</h3>
                            <p>Make it easy for people to find you</p>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
                                <div style={{ width: '90%', textAlign: 'center' }}>
                                    <input id="file" type="file" accept="image/*" style={{ display: "none" }} onChange={this.handleChange} />
                                    {
                                        this.state.isImg ? (
                                            <>
                                                <img className="img_taked" src={this.state.file} />
                                            </>
                                        ) : (
                                            <>
                                                <label for="file" style={{ cursor: "pointer" }}><img src={img} className="img_up" /></label>
                                            </>
                                        )
                                    }

                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                                    {
                                        this.state.isImg ? (
                                            <>
                                                <a className='cancel' onClick={this.cancel}>Cancel</a>
                                                <a className="done" onClick={this.done}>Done</a>
                                            </>
                                        ) : (
                                            <>
                                                <a className='back' onClick={this.back}>Back</a>
                                                <Link to='/Troder'>
                                                    <a className="skipe" onClick={this.skip}>Skip</a>
                                                </Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>


        )
    }
}

export default Create;
