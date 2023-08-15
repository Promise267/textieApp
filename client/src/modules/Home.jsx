import React, { useEffect,  useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from "../components/Chat";
import Chats from "../components/Chats";
import Search from '../components/Search';
import io from "socket.io-client";
import Cookies from 'js-cookie';
import axios from "axios";

const socket = io.connect("http://localhost:5000");

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const [room, setRoom] = useState([]);
  const [userId, setUserId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    socket.emit("login");

    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:5000/user/getUser");
        const foundUser = userResponse.data.find(user => user.username === username);
        if (foundUser) {
          setUserId(foundUser._id);
        }

        const chatUserResponse = await axios.get(`http://localhost:5000/getChatUser/${userId}`);
        const chatRoomIds = chatUserResponse.data.map(room => room.roomid);

        const chatRoomsResponse = await axios.get("http://localhost:5000/chatRoom/getRoom");
        const foundRooms = chatRoomsResponse.data.filter(room => chatRoomIds.includes(room._id));
        
        if (foundRooms.length > 0) {
          setRoom(foundRooms.map((room) => ({id: room._id, name: room.room})));
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
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


  const openChat = (id, room) => {
    setSelectedRoomId(id)
    setSelectedRoom(room);
    socket.emit("joinRoom", room)
  };


  const fetchUpdatedRooms = async() => {
    try {
        const chatUserResponse = await axios.get(`http://localhost:5000/getChatUser/${userId}`);
        const chatRoomIds = chatUserResponse.data.map(room => room.roomid);

        const chatRoomsResponse = await axios.get("http://localhost:5000/chatRoom/getRoom");
        const foundRooms = chatRoomsResponse.data.filter(room => chatRoomIds.includes(room._id));
        
        if (foundRooms.length > 0) {
          setRoom(foundRooms.map((room) => ({id: room._id, name: room.room})));
        }
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="sidebar col-2">
            <div className="sidebar-heading">
              <img src="../" className="m-2 rounded-circle img-responsive p-4 border border-grey" />
              <h3 className="heading-display custom-text usernameSpace text-light">{username}</h3>
            </div>
              <div className="sidebar-body">
              <ScrollToBottom className="message-container">
                <Chats rooms={room} openChat={openChat}/>
              </ScrollToBottom>
            </div>
            <div className="sidebar-footer">
              <button type="submit" className="logoutbtn w-100" onClick={logout}>Logout</button>
            </div>
          </div>
          <div className="chat col-10">
            <Search 
              socket={socket} 
              username={username} 
              userId={userId} 
              setSelectedRoom={setSelectedRoom}
              setSelectedRoomId={setSelectedRoomId}
              fetchUpdatedRooms={fetchUpdatedRooms}
               />
            {selectedRoom && 
              <Chat socket={socket} 
              userId = {userId}
              username = {username} 
              room={selectedRoom}
              roomId = {selectedRoomId}
              />}
          </div>
        </div>
      </div>
    </>
  );
}
