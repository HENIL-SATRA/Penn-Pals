import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import './userProfile.css'
import ProfilePost from '../profilePost/profilePost'
import logo from "../../assets/logo.png";
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import ActivityFeed from '../activityFeed/activityFeed';
import axios from "axios"

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"})

const navItems = [
    {
        "name": "Notifications",
        "value": "notifications"
    },
    {
        "name": "Feed",
        "value": "feed"
    },
    {
        "name": "Logout",
        "value": "logout"
    }
  ];

function UserProfile() {
    const navigate = useNavigate();
    const { loggedInUser } = useParams();

    const [userData, setUserData] = React.useState({
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
    })

    React.useEffect(() => {
        const fetchData = async () => {
            await api.get(`user/${loggedInUser}`).then(res => { 
                setUserData(res.data);
            });
        };

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const navigatePage = async (item: any) => {
        if (item === "FEED"){
            navigate(`/feed/${loggedInUser}`)
        } else if (item === "NOTIFICATIONS") {
            navigate('/notifications')
        }
    }

    const [TextualPosts] = React.useState([
        {
            caption: "Truth is stranger than fiction, but it is because fiction is obliged to stick to possibilities; truth isn't.",
            imageUrl: "",
            date: "16 September 2021",
            postType: "textual"
        },
        {
            caption: "Oh, I'm a God!",
            imageUrl: "",
            date: "3 September 2021",
            postType: "textual"
        },
    ]);

    let postWrapper = []
    for(let i = 0; i < userData.posts.length; i++) {
        postWrapper.push(<ProfilePost postid={Number(userData.posts[i])} />)
    }


    // const postWrapper = userData.posts.map((post) => (
    //     <ProfilePost postid={Number(post)} />
    // ))
  
    return (
        <Grid container spacing={2} justifyContent="center" >
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
                                  <Button key={item.value} onClick={(item) => navigatePage(item.currentTarget.innerText)} sx={{ color: '#7F190E' }}>
                                      {item.name}
                                  </Button>
                              ))}
                          </Box>
                        </Toolbar>
                    </AppBar>
                </Box>
            </Grid>
            <Grid container spacing={3} justifyContent="center" >
                <Grid 
                    item 
                    xs={0}
                    sx={{ display:'flex', justifyContent:'center'}}
                    style={{ marginTop: '5%' }}
                >
                    <Avatar src={userData["display_picture"]} sx={{ width: 250, height: 250, border: 3, borderColor: 'gray'}}/>
                </Grid>
                <Grid 
                    item 
                    xs={4}
                    style={{ marginTop: '5%' }}
                >
                    <Grid item sx={{ height: '85%' }}>
                            <Typography id="firstName" variant='h3' align='left' sx={{ fontWeight: 'bold' }}>{userData["firstname"]}&nbsp;{userData["lastname"]}</Typography>
                            <Typography variant='h6' align='left' sx={{ fontWeight: 'bold', display: 'inline-block'}}>{userData["followers"].length}&nbsp;</Typography>
                            <Typography variant='h6' align='left' sx={{ display: 'inline-block'}}>Followers</Typography>
                            <br></br>
                            <Typography variant='h6' align='left' sx={{ fontWeight: 'bold', display: 'inline-block'}}>{userData["following"].length}&nbsp;</Typography>
                            <Typography variant='h6' align='left' sx={{ display: 'inline-block'}}>Following</Typography>
                            <Typography variant='h6' align='left'>{userData["bio"]}</Typography>
                    </Grid>
                    <Grid item sx={{ display:'flex', alignItems:'flex-end'}}>
                        <ButtonGroup variant='contained' style={{ color:'primary', float:'left'}}>
                            <Button onClick = {() => navigate(`/addpost/${loggedInUser}`)}>
                                Add Post
                            </Button>
                            <Button style={{marginLeft: 3}}>
                                Add Status
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid 
                    item 
                    xs={4} 
                    sx={{ display:'flex', justifyContent:'center'}}
                    style={{ marginTop: '2%' }}
                >
                    <Typography variant='h6'>Photos</Typography>
                </Grid>
                <Grid 
                    item 
                    xs={3} 
                    sx={{ display:'flex', justifyContent:'center'}}
                    style={{ marginTop: '2%' }}
                >
                    <Typography variant='h6'>Status</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid 
                    item 
                    xs={4} 
                    sx={{ justifyContent:'center'}}
                >
                    <Divider sx={{ borderBottomWidth: 3, borderColor: 'gray' }}/>
                </Grid>
                <Grid 
                    item 
                    xs={3} 
                    sx={{ justifyContent:'center'}}
                >
                    <Divider sx={{ borderBottomWidth: 3, borderColor: 'gray' }}/>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
                <Grid 
                    item 
                    xs={4} 
                    sx={{display:'flex', justifyContent:'center'}}
                >
                    <Box sx={{ display: 'flex'}}>
                        <div>
                            {postWrapper}
                        </div>
                    </Box>
                </Grid>
                <Grid 
                    item 
                    xs={3} 
                    sx={{ justifyContent:'center'}}
                >
                    <Box sx={{ display: 'flex'}}>
                        <div>
                            {TextualPosts.map((TextualPost) => (
                            <ProfilePost
                                caption={TextualPost.caption}
                                imageUrl={TextualPost.imageUrl}
                                date={TextualPost.date}
                                postType={TextualPost.postType}
                            />
                            ))}
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <Routes>
              <Route path={`/feed/${loggedInUser}`} element={<ActivityFeed />} />
            </Routes>
        </Grid>
    );
}

export default UserProfile;