import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search({ socket, username, userId, selectedRoom, setSelectedRoom, setSelectedRoomId, fetchUpdatedRooms }) {
  const [room, setRoom] = useState("");

  useEffect(() => {
    setRoom(selectedRoom || "");
  }, [selectedRoom]);


  const joinRoom = async () => {
    if(room.length!==0){
      try {
        socket.emit("joinRoom", room)
        const getRoomResponse = await axios.get("http://localhost:5000/chatRoom/getRoom")
        if(getRoomResponse){
          //if the chat already exists
         const existingRoom = getRoomResponse.data.find(theroom => theroom.room === room)
          if(existingRoom){
            const roomId = existingRoom._id;
            try {
              await axios.post(`http://localhost:5000/addChatUser/${roomId}/${userId}`)
                setSelectedRoom(room);
                setSelectedRoomId(roomId)
                await fetchUpdatedRooms();
            } catch (error) {
              console.log(error);
            }
          }
          //if the chat does not exists
          else{
            try {
              const response = await axios.post("http://localhost:5000/chatRoom/addRoom", {
                room : room
              })
              if(response){
                const getChatResponse = await axios.get("http://localhost:5000/chatRoom/getRoom")
                if(getChatResponse){
                  const newRoom = getChatResponse.data.find(theroom => theroom.room === room)
                  if (newRoom) {
                    const newRoomId = newRoom._id
                    try {
                      await axios.post(`http://localhost:5000/addChatUser/${newRoomId}/${userId}`)
                      setSelectedRoom(room);
                      setSelectedRoomId(newRoomId);
                        await fetchUpdatedRooms();
                    } catch (error) {
                      console.log(error);
                    }
                  }
                }
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    else{
      alert("room is empty")
    }
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="inputBoxsearch w-100"
              placeholder="Room No"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              value={room}
            />
          </div>
          <button type="submit" className="joinbtn" onClick={joinRoom}>Join</button>
        </div>
      </div>
    </>
  );
}
