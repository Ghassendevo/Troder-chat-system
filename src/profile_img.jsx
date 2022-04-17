import reactDom from "react-dom";
import React from "react";
import img from './image.png';
import { Link } from "react-router-dom";
import axios from "axios";
class Profile_img extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            upload_img: 'none',
            handle_img: 'undone',
            file: null,
            fileName: null,
            fili: null,
            isImg: false,
        }
        this.handleChange = this.handleChange.bind(this);
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
    render() {
        return (
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
                                        <a className='back'>Back</a>
                                        <a className="skipe" onClick={this.skip}>Skip</a>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile_img;