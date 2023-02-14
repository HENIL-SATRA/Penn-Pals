import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, TextField } from '@mui/material';
import './postCreation.css'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import LockIcon from '@mui/icons-material/Lock';
import logo from "../../assets/logo.png";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

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

function PostCreation() {

    const navigate = useNavigate();
    const { loggedInUser } = useParams();

    const [loggedUserData, setLoggedUserData] = React.useState({
        "userid": "",
        "firstname": "",
        "lastname": "",
        "email": "",
        "phonenum": "",
        "password": "",
        "display_picture": "",
        "bio": "",
        "posts": [""],
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
                setLoggedUserData(res.data);
            });
        }

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigatePage = (item: any) => {
        if (item === "FEED"){
            navigate('/feed')
        }
    }

    const [imageToAdd, setImageToAdd] = React.useState("");

    const newPost = (e: any) => {
        setImageToAdd(e.currentTarget.src)
    }

    const [caption, setCaption] = React.useState("Your caption here...")
    const readText = (e: any) => {
        setCaption(e.target.value)
    }

    const handleConfirm = async (e: any) => {
        
        await api.post("/getFeed", {
            username: loggedUserData.userid,
            post_type: "visual",
            caption: caption,
            likes: [],
            comments: [],
            tags: [],
            userid: loggedInUser,
            posting: imageToAdd
        })

        let postid = 0
        await api.get('/getFeed').then(res =>
            postid += res.data.length
        )

        let postList = loggedUserData["posts"]
        postList.push(String(postid))
        await api.put(`/user/${loggedInUser}`, {
            posts: postList
        })

        navigate(`/myprofile/${loggedInUser}`)
    }
  
    const [images, setImages] = React.useState([]);
    

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {

        setImages(imageList as never[]);
      };
  
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sx={{ paddingBottom: '5%' }}>
                <Box sx={{ display: 'flex'}}>
                    <AppBar component="nav" style={{ background: 'white', opacity: "20"}}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
    
                            </IconButton>
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

            <Grid container justifyContent="center">
                <Grid item xs={8} sx={{ border: 3, borderColor: 'gray', borderRadius: '15px', backgroundColor: '#D3D3D3'}}>
                    <Grid container spacing={0} justifyContent="center">
                        <Grid container spacing={0} justifyContent="center">
                            <Grid item xs={1} sx={{ borderBottom: 3, borderColor: 'gray' }}>
                                <Button startIcon={<CheckIcon/>} onClick = {handleConfirm}/>
                            </Grid>
                            <Grid item xs={10} display="flex" justifyContent="center" alignItems="center" sx={{ borderBottom: 3, borderColor: 'gray' }}>
                                <Typography variant='h6' sx={{ fontWeight: 'bold' }}> Add Post </Typography>
                            </Grid>
                            <Grid item xs={1} display="flex" justifyContent="flex-end" alignItems="flex-end" sx={{ borderBottom: 3, borderColor: 'gray' }}>
                                <Button startIcon={<CloseIcon/>} onClick = {() => navigate(`/myprofile/${loggedInUser}`)}/>
                            </Grid>
                        </Grid>

                        <Grid item xs={8} display="flex" justifyContent="center" alignItems="center" sx={{ borderRight: 3, borderColor: 'gray' }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant='h6'>Upload a photo or video</Typography>
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                    <ImageUploading
                                        value={images}
                                        onChange={onChange}
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                        }) => (
                                            <div>
                                                <Button 
                                                    variant='contained'
                                                    onClick={onImageUpload}
                                                >
                                                    Browse Files
                                                </Button>
                                            
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image.dataURL} alt="" width="100%" onLoad={newPost}/>
                                                    </div>
                                                ))}

                                            </div>
                                        )}
                                    </ImageUploading>
                                </Grid>

                            </Grid>   
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container spacing={0} justifyContent="center">
                                <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="left">
                                    <Typography variant='h6' align='left' sx={{ pl: 1 }} >Caption</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField 
                                    variant="standard" multiline rows="3" 
                                    InputProps={{ disableUnderline: true }} 
                                    sx={{ pl: 1, width: '95%'}}
                                    value = {caption}
                                    onChange = {readText}
                                    id="caption" />
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ borderTop: 3, borderColor: 'gray' }}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="left">
                                            <Typography variant='h6' align='left' sx={{ pl: 1 }}>Visibility</Typography>
                                        </Grid>
                                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                            <Button variant='contained' sx={{ width: '90%'}}>
                                                <LanguageIcon/> &nbsp;Public | Viewable by All Users
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
                                            <Button variant='contained' sx={{ marginTop: 1, marginBottom: 1, width: '90%'}}>
                                                <LockIcon/> &nbsp;Private | Followers Only
                                            </Button>
                                        </Grid>
                                    </Grid>   
                                </Grid>
                                <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ borderTop: 3, borderColor: 'gray' }}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} display="flex" justifyContent="flex-start" alignItems="left" sx={{ paddingBottom: 20 }} >
                                            <Typography variant='h6' align='left' sx={{ pl: 1 }}>Tags</Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" sx={{ paddingBottom: 1 }}>
                                            
                                        </Grid> */}
                                    </Grid>   
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default PostCreation;
