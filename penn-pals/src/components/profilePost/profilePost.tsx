import * as React from 'react';
import { Typography } from "@mui/material";
import "./profilePost.css";
import axios from "axios"

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"});

function ProfilePost({postid} : any) {
    const [userPost, setUserPost] = React.useState({
        "username": "",
        "posting": "",
        "post_type": "",
        "caption": "",
        "likes": [],
        "comments": [],
        "tags": [],
        "id": ""
    })

    React.useEffect(() => {
        if(postid) {
            const fetchData = async () => {
                await api.get(`getFeed/${postid}`).then(res => {
                    setUserPost(res.data)
                })
            }
            fetchData();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (userPost.post_type === "visual") {
        return (
            <div>
                <Typography sx={{ fontWeight: 'bold', color: 'gray'}} >{userPost.caption}</Typography>
                <img src={userPost.posting} width="100%" alt=""/>
            </div>
        );
    }
    else {
        return (
            <div>
                <Typography sx={{ fontWeight: 'bold', color: 'gray'}} >{userPost.caption}</Typography>
                <Typography sx={{ fontWeight: 'bold' }} >{userPost.caption}</Typography>
            </div>
        );
    }
}

export default ProfilePost;
