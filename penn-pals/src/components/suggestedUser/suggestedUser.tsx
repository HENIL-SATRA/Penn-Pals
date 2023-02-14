import { Avatar, Button,} from "@mui/material";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search"
import IconButton from '@mui/material/IconButton';
import {useNavigate} from 'react-router-dom';
import './suggestedUser.css'
import axios from "axios"

const api = axios.create({baseURL: "https://63407096d1fcddf69cb8ca66.mockapi.io"})

function SuggestedUser({loggedInUser} : any) {
    const filterData = (query : string, d : any) => {
        return d
    };
    
    const [suggested, setSuggested] = useState([
        "No More User To Follow",
    ]); 

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, suggested);
  let followingArrForLogged = ["No More User To Follow"];
  let followersArrForUser = ["No More User To Follow"];
    React.useEffect(() => {
        
        const fetchData = async () => {
            let newSuggested = ["No More User To Follow"]
            await api.get('/user').then(res =>{ 
                for (var i = 0; i < res.data.length; i = i + 1) {
                    if (res.data[i].id === loggedInUser){
                        for(var j = 0; j < res.data.length; j = j + 1){
                            if((res.data[i].following.indexOf(res.data[j].userid) === -1) && (res.data[i].id !== res.data[j].id)){
                                newSuggested.push(res.data[j].firstname + " " + res.data[j].lastname)
                                }
                        }
                    }
                    setSuggested(newSuggested.slice(1)) 
                }   
            });
        };
        fetchData()
        // eslint-disable-next-line
    }, []);
    const SearchBar = ({setSearchQuery} : any) => (
        <form style={{
            marginTop: "27%"
        }}>
        <TextField
            id="search-bar"
            className="text"
            onInput={() => {
            // setSearchQuery();
            }}
            style={{
                width: "250px",
            }}
            label="Search a user"
            variant="outlined"
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: "#171F57" }} />
        </IconButton>
        </form>
    );
    
    const navigate = useNavigate();
    const getUser = async (user : string) => {
        await api.get('/user').then(res => {
          for (var i = 0; i < res.data.length; i = i + 1) {
              
              var str = res.data[i].firstname + " " + res.data[i].lastname
              if (str === user){
                navigate(`/otherprofile/${loggedInUser}/${res.data[i].id}`)
              }
          }  
        });
      }
      let logged = Number(loggedInUser) - 1
      const [followValue, setFollowValue] = React.useState('Follow');
      const changeFollow = async(user : string) => {
        if (followValue === "Follow") {
            let i = 0
        await api.get('/user').then(res => {
            for ( ; i < res.data.length; i = i + 1) {
                
                var str = res.data[i].firstname + " " + res.data[i].lastname
                if (str === user){
                    followersArrForUser = res.data[i].followers
                    followingArrForLogged = res.data[logged].following
                    followingArrForLogged.push(res.data[i].userid)
                    
                    followersArrForUser.push(res.data[logged].userid)
                    
                    break
                }
            }
        });
                await api.put(`/user/${loggedInUser}`, {
                    following: followingArrForLogged
                })
                await api.put(`/user/${i+1}`, {
                    followers: followersArrForUser
                })
                navigate(`/otherprofile/${loggedInUser}/${i + 1}`)
               
          setFollowValue("Unfollow");
          
    }
    
 }
  return (
    <div>
                <SearchBar setSearchQuery={setSearchQuery}/>
                <div className='suggestedUser'>
                    <div className='line'></div>
                    <div style={{
                        paddingTop: "10px",
                        paddingLeft: "10px",
                        fontSize: 20,
                        textAlign: "center",
                        color: "#7F190E"
                    }}>Suggested Users</div>
                    <div className='userBlock'>
                        {dataFiltered.map((d : any) => (
                            <div className='user' key={d}>
                                <><Avatar
                                className="post__avatar"
                                src="/static/images/avatar/1.jpg"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    display: "inline-flex"
                                }} /><span
                                    className="text" style={{
                                        cursor: "pointer",
                                        justifyContent: "normal",
                                        fontSize: 18,
                                        color: "#7F190E",
                                        margin: 1,
                                        width: "200px",
                                        borderWidth: "10px"
                                    }}
                                    key={d.id}
                                    onClick={(e) => getUser(d)}>
                                    {d}
                                    </span>
                                <Button key={d.id} onClick={(e) => changeFollow(d)}>{followValue}</Button>
                                </>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
  );
}

export default SuggestedUser;
