import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Grid } from '@mui/material';
import Post from '../post/post';
import './activityFeed.css'
import logo from "../../assets/logo.png";
import SuggestedUser from '../suggestedUser/suggestedUser';
import axios from "axios";
import { getAllPosts } from "../../service/contactDB";

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"});

function ActivityFeed() {

    // const baseURL = "https://63407096d1fcddf69cb8ca66.mockapi.io/getFeed";

    const navigate = useNavigate();
    const { loggedInUser } = useParams();
    const [posts, setPosts] = React.useState([{
            username: "",
            posting: "",
            post_type: "",
            caption: "",
            likes: [],
            comments: [],
            tags: [],
            id: 0
        }]
    )
    
    React.useEffect(() => {
        const fetchData = async () => {
            await getAllPosts().then((data) => setPosts(data))
        };
        fetchData();
    }, []);

    const navItems = ["Notifications", "Profile", "Logout"]

    const navigatePage = async (item: any) => {
        if (item === "PROFILE"){
            navigate(`/myprofile/${loggedInUser}`)
        }
    }

    const userPosts = posts.map((post) => (
        <Post
            key={post}
            loggedInUser={loggedInUser}
            postData={post} />
        ))

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
                <Box sx={{ display: 'flex'}}>
                    <AppBar component="nav" style={{ background: 'white', opacity: "20"}}>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', color: "#171F57", textAlign: "center", fontFamily: "cursive", fontWeight: "bold", fontSize: "40px" } }}
                            >
                                <img src={logo} alt="logo" height="40" />
                            </Typography>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                {navItems.map((item) => (
                                    <Button key={item} onClick={(item) => navigatePage(item.currentTarget.innerText)} sx={{ color: '#7F190E' }}>
                                        {item}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Grid item xs={5} style={{
                marginTop: '5%'
            }}>
                <Box>
                    <div className="timeline">
                        {userPosts}
                    </div>
                </Box>
            </Grid>
            
            <Grid item xs={3}>
                {<SuggestedUser loggedInUser={loggedInUser}/>}
                </Grid>
        </Grid>
        
    );
}

export default ActivityFeed;