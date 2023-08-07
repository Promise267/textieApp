import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Search({ socket, username, userId, selectedRoom, setSelectedRoom, fetchUpdatedRooms }) {
  const [room, setRoom] = useState("");

  useEffect(() => {
    setRoom(selectedRoom || "");
  }, [selectedRoom]);

  const joinRoom = () => {
    if (room.length !== 0) {
      socket.emit("joinRoom", room);
  
      axios.post(`http://localhost:5000/chatRoom/${userId}`, {
        room: room,
        userId: userId
      }).then(() => {
        setSelectedRoom(room);
        fetchUpdatedRooms();
      }).catch((error) => {
        console.error(error);
      });
    } else {
      alert("Room field empty");
    }
  }

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
