import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import io from "socket.io-client";
import Cookies from 'js-cookie';
import axios from "axios";
import Chats from "../components/Chats";
import Chat from "../components/Chat";

const socket = io.connect("http://localhost:5000");

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [room, setRoom] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    socket.emit("login");

    axios.get("http://localhost:5000/user/getUser")
      .then((response) => {
        const foundUser = response.data.find(user => user.username === username)
        if (foundUser) {
          setUserId(foundUser._id)
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get("http://localhost:5000/chatRoom/getRoom")
      .then((response) => {
        console.log(response.data);
        const foundRooms = response.data.filter((room) => room.userId === userId);
        if (foundRooms.length > 0) {
          setRoom(foundRooms);
          console.log(foundRooms);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }, [userId, username]);




  const logout = async (e) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post("http://localhost:5000/logout", {
        accessToken: accessToken
      });
      if (response) {
        socket.emit("logout");
        Cookies.remove("accessToken", accessToken)
        localStorage.removeItem("accessToken", accessToken)
      }
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  };


  const openChat = (room) => {
    setSelectedRoom(room);
    socket.emit("joinRoom", room)
  };


  const fetchUpdatedRooms = () => {
    axios.get("http://localhost:5000/chatRoom/getRoom")
      .then((response) => {
        const foundRooms = response.data.filter((room) => room.userId === userId);
        if (foundRooms.length > 0) {
          setRoom(foundRooms);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar col-2">
            <h3 className="heading-display custom-text">{username}</h3>
            <button type="submit" className="logoutbtn w-100" onClick={logout}>Logout</button>
            <Chats rooms={room} openChat={openChat}/>
          </div>
          <div className="chat col-10">
            <Search 
              socket={socket} 
              username={username} 
              userId={userId} 
              setSelectedRoom={setSelectedRoom}
              fetchUpdatedRooms={fetchUpdatedRooms}
               />
            {selectedRoom && 
              <Chat socket={socket} 
              username={username} 
              room={selectedRoom} 
              />}
          </div>
        </div>
      </div>
    </>
  );
}
