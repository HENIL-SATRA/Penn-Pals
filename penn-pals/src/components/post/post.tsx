import { Avatar, Box, Button, Modal } from "@mui/material";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';
import { Routes, Route, useNavigate} from 'react-router-dom';
import './post.css'
import React from "react";
import OtherUserProfile from "../otherUserProfile/otherUserProfile";
import axios from "axios"
import { Mention, MentionsInput, SuggestionDataItem} from 'react-mentions'

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"});

function Post({loggedInUser, postData} : any) {

  const navigate = useNavigate();

  const [like, setLike] = React.useState(true)

  var users = React.useRef<SuggestionDataItem[]>([])
  var comRef = React.useRef<String[]>([])
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    setLike(postData.likes.indexOf(Number(loggedInUser)) > -1)
    let result: any[] = []
        let comms = []
        const fetchData = async () => {
            await api.get('/user').then(res => { 
                result = (res.data);
            });

            users.current = result.map((res) => ({
                id: res.userid,
                display: `${res.firstname} ${res.lastname}`
            }))

            await api.get(`/getFeed/${postData.id}`).then(res => { 
                comms = (res.data);
                comRef.current = comms.comments
            });
        };

        fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const setValue = (value: string) => {
        setComment(value)
    }

    const setComments = async() => {
        const regex = /\[(.*)\]/
        const op = comment.match(regex)
        if(op){
            let clean = comment.replace(op[0], '')
            let comList = comRef.current
            comList.push(clean)
            comRef.current = comList 
        } else {
          let comList = comRef.current
          comList.push(comment)
          comRef.current = comList 
        }

        await api.put(`/getFeed/${postData.id}`, {
            comments: comRef.current
        })
        setComment('')
    }


  const navToUser = () => {
    if (postData.userid === loggedInUser) {
      navigate(`/myprofile/${loggedInUser}`)
    } else {
      navigate(`/otherprofile/${loggedInUser}/${postData.userid}`)
    }
  }

  const changeLike = async () => {
    let user_likes = postData.likes

    if(like === false){
      setLike(true);
      <BsHeartFill style={{
        marginLeft : '27%',
        position: 'absolute'
      }}></BsHeartFill>

      user_likes.push(Number(loggedInUser))
      
      await api.put(`/getFeed/${postData.id}`, {
        likes: user_likes
      }) 

    } else {
      setLike(false);
      <BsHeart style={{
        marginLeft : '27%',
        position: 'absolute'
      }}></BsHeart>

      user_likes.splice(user_likes.indexOf(Number(loggedInUser)), 1)

      await api.put(`/getFeed/${postData.id}`, {
        likes: user_likes
      }) 

    }
  }

  const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setOpen(false);
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60vw",
    height: "50vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="ava"
          src="/static/images/avatar/1.jpg"
        />
        <h3 style={{ cursor: "pointer" }} onClick={(e) => navToUser()}>{postData.username}</h3>
        <span style={{marginLeft: "25%", position: "absolute"}}>
          {like?
          <BsHeartFill aria-label="heartFill" style={{
            cursor: "pointer"
          }} onClick={() => {changeLike()}}></BsHeartFill> : 
          <BsHeart style={{
            cursor: "pointer"
          }} onClick={() => {changeLike()}}></BsHeart>}
        </span>
        <BiComment aria-label="comment" style={{
            marginLeft : '28%',
            position: 'absolute',
            cursor: "pointer"
        }} onClick={handleOpen}></BiComment>
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          data-testid="modal-input"
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: "50vw" }}>
          <div>
            <Button className="closeButton" onClick={handleClose}>&times;</Button>
            <h2 id="child-modal-title">Comments</h2>
          </div>
          <div id="child-modal-description">
                <div className="content">
                {comRef.current.map((res) => (
                    <div style={{
                        marginLeft: "10px"
                    }}><Avatar
                                className="post__avatar"
                                src="/static/images/avatar/1.jpg"
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    display: "inline-flex",
                                    marginBottom: "5px"
                    }}/>{res}</div>
                ))}
                </div>
                <div className='commentInput'>
                    <MentionsInput 
                        style={{
                            display:"inline-block",
                            width: '50%'
                        }}
                        className='mentionInput'
                        placeholder='Comment here'
                        value={comment}
                        onChange={(e) => setValue(e.target.value)}>
                        <Mention data={users.current} trigger={'@'} />
                    </MentionsInput>
                    <Button 
                    style={{
                        display:"inline-block"
                    }}
                    onClick={()=>{setComments()}}>Comment</Button>
                </div>
          </div>
        </Box>
        </Modal>
        
      </div>
      {/* Image */}
      <img className="post__image" src={postData.posting} alt="post" />

      <h4 className="post__text">
        <strong style={{ cursor: "pointer" }} onClick={(e) => navToUser()}>{postData.username}</strong> {postData.caption}
      </h4>    
      <Routes>
        <Route path={`/users/${postData.userid}`} element={<OtherUserProfile />} />
      </Routes>
    </div>
    
  );
}

export default Post;