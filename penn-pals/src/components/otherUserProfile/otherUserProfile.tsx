import * as React from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar'
import './otherUserProfile.css'
import ActivityFeed from '../activityFeed/activityFeed';
import logo from "../../assets/logo.png";
import ProfilePost from '../profilePost/profilePost';
import axios from "axios"

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"});

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

function OtherUserProfile() {

    const navigate = useNavigate();
    const { loggedInUser } = useParams();
    const { otherUser } = useParams();

    const [loggedUserData, setLoggedUserData] = React.useState({
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

    const [otherUserData, setOtherUserData] = React.useState({
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

    const [followValue, setFollowValue] = React.useState('Unfollow');
    let followingArrForLogged = ["Harry Sandhu"];
    let otherUserID = "Harry_Sandhu";
    React.useEffect(() => {
        const fetchData = async () => {
            await api.get(`user/${loggedInUser}`).then(res => { 
                setLoggedUserData(res.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                followingArrForLogged = res.data.following
            });

            await api.get(`user/${otherUser}`).then(res1 => { 
                setOtherUserData(res1.data);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                otherUserID = res1.data.userid
            });
            if(followingArrForLogged.indexOf(otherUserID) === -1){
                setFollowValue("Follow")
            }
            else{
                setFollowValue("Unfollow")
            }

        };

        fetchData();
    }, []);

    const changeFollow = async () => {

        if (followValue === "Follow")  
        {
            let followingArr = loggedUserData["following"]
            followingArr.push(otherUserData["userid"])
            let followersArr = otherUserData["followers"]
            followersArr.push(loggedUserData["userid"])

            // await updateFollowing({loggedInUser, followingArr})
            // await updatedFollowers({otherUser, followersArr})
            
            await api.put(`/user/${loggedInUser}`, {
                following: followingArr
            })

            await api.put(`/user/${otherUser}`, {
                followers: followersArr
            })

            setFollowValue("Unfollow");
        }
        else 
        {
            let followingArr = loggedUserData["following"]
            followingArr.splice(followingArr.indexOf(otherUserData["userid"]), 1)
            let followersArr = otherUserData["followers"]
            followersArr.splice(followingArr.indexOf(loggedUserData["userid"]), 1)

            // await updateFollowing({loggedInUser, followingArr})
            // await updatedFollowers({otherUser, followersArr})

            await api.put(`/user/${loggedInUser}`, {
                following: followingArr
            })

            await api.put(`/user/${otherUser}`, {
                followers: followersArr
            })

            setFollowValue("Follow");
        }
    }

    const navigatePage = (item: any) => {
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

    const postWrapper = otherUserData.posts.map((post) => (
        <ProfilePost postid={post} />
    ))

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
                    xs={2} 
                    sx={{ display:'flex', justifyContent:'center'}}
                    style={{ marginTop: '5%'}}
                >
                        <Avatar src={otherUserData["display_picture"]} sx={{ width: 200, height: 200, border: 3, borderColor: 'gray'}}/>
                </Grid>
                <Grid 
                    item 
                    xs={3}
                    style={{ marginTop: '5%' }}>
                    <Grid item sx={{ height: '85%'}}>
                        <Typography variant='h4' align='left' sx={{ fontWeight: 'bold' }}>{otherUserData["firstname"]}&nbsp;{otherUserData["lastname"]}</Typography>
                        <div style={{textAlign: "left"}}>
                          <Typography variant='h6' sx={{ fontWeight: 'bold', display: 'inline-block'}}>{otherUserData["followers"].length}&nbsp;</Typography>
                          <Typography variant='h6' sx={{ display: 'inline-block', marginLeft: "2%"}}>Followers</Typography>
                        </div>
                        <div style={{textAlign: "left"}}>
                          <Typography variant='h6' sx={{ fontWeight: 'bold', display: 'inline-block'}}>{otherUserData["following"].length}&nbsp;</Typography>
                          <Typography variant='h6' sx={{ display: 'inline-block'}}>Following</Typography>
                        </div>
                        <Typography variant='h6' align='left'>{otherUserData["bio"]}</Typography>
                    </Grid>
                    <Grid item sx={{ display:'flex', alignItems:'flex-end'}}>
                    <ButtonGroup variant='contained' style={{ color:'primary', float:'left'}}>
                        <Button id='follow' onClick={changeFollow}>
                            {followValue}
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
                    xs={2} 
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
                    xs={2} 
                    sx={{ justifyContent:'center'}}
                >
                    <Divider sx={{ borderBottomWidth: 3, borderColor: 'gray' }}/>
                </Grid>
            </Grid>
            <Grid container spacing={1} justifyContent="center">
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
                    xs={2} 
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

export default OtherUserProfile;
