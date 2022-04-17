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
import { Provider } from "react";
import { useStat } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Pass from './password';
import logo from './6546.png'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: 'block',
      spinner: 'none',

    }

  }



  get_change = () => {
    this.setState({ ldisplay: "block" });
    this.setState({ sdisplay: "none" });
  }
  change = () => {
    this.setState({ sdisplay: "block" });
    this.setState({ ldisplay: "none" });
  }
  cancel = () => {
    this.setState({ isImg: false });
    this.setState({ file: null });
    this.setState({ fileName: null });
    this.setState({ fili: null });
  }

  render() {
    return (
      <>
        <LinearProgress style={{ display: this.state.spinner }} />
        <div className="navbar">
          <div className="header">
            <div className="leftheader">
              <img src={logo}  alt="" style={{width:'230px', height:'50p'}} />
            </div>
            <div className="rightheader">


              <Router>
                <Link to="/">
                  <a className="login">Login</a>
                </Link>
                <Link to="/create">
                  <a className="create_new" href="#singup">Create New</a>
                </Link>
                <Switch>

                  <Route exact path='/' component={Login} />
                  <Route path='/create' component={Create} />
                  <Route path='/password' component={Pass} />


                </Switch>
              </Router>
            </div>
          </div >
        </div>









      </>
    );
  }
}
export default App;
