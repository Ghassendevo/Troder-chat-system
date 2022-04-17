import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ReactDOM } from "react";
const Lastchat = ({user, socket})=>{
    //get last messages for last user
    const [userMess, setuserMess] = useState([])
    const [userInfo , setuserInfo] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(()=>{
        axios.post('localhost://3001/lastChat', {
            auth_id : user.id
        }).then(res=>{
            setuserInfo(res.data.userInfo)
            setuserMess(res.data.userMess)
            setisLoading(false)
        })
    }, [])
    return(
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    sd
                </div>
            )
        }
        </div>
    )
}
export default Lastchat;