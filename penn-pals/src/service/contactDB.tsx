
import axios from "axios"
import { resourceLimits } from "worker_threads";

const baseURL= "https://63407096d1fcddf69cb8ca66.mockapi.io"
const api = axios.create({baseURL: baseURL})

export const getAllUsers = async () => {
    let allUsers:any = []
    await api.get('/user').then(res => allUsers = res.data );
    return allUsers
}

export const getPost = async ({postid}: any) => {
    let post = {}
    await api.get(`/getFeed/${postid}`).then(res => post = res.data );
    return post
}

export const getAllPosts = async () => {
    let allPosts:any = []
    await api.get('/getFeed').then(res => allPosts = res.data );
    return allPosts
}

export const getUser = async ({userid}: any) => {
    let user = {
        "userid": "",
        "firstname": "",
        "lastname": "",
        "email": "",
        "phonenum": "",
        "password": "",
        "display_picture": "",
        "bio": "",
        "posts": [],
        "followers": [
            "",
            ""
        ],
        "following": [
            "",
            ""
        ],
        "notification": [
            {
            "userid": "",
            "notification_id": "",
            "datetime": "",
            "follower_email": ""
            }
        ],
        "loginstatus": ""
    }
    await api.get(`/user/${userid}`).then(res => user = res.data );
    return user
}

export const updateFollowing = async ({userid, followingArr}: any) => {
    await api.put(`/user/${userid}`, {
        following: followingArr
    });
}

export const updatedFollowers = async ({userid, followersArr}: any) => {
    await api.put(`/user/${userid}`, {
        followers: followersArr
    });
}

export const updateLikes = async ({postid, likesArr}: any) => {
    await api.put(`/getFeed/${postid}`, {
        likes: likesArr
    });
}

export const addPost = async ({post}: any) => {
    await api.post(`/getFeed`, {post}).then((response: any) => {return response});
}

export const addUser = async ({firstName, lastName, email, userID, password}: any) => {
    await api.post("/user", {
            firstname: firstName,
            lastname: lastName,
            email: email,
            userid: userID,
            password: password
            })
        .then((response) => {
            return response;
        });
}

export const getSuggested = async () => {}