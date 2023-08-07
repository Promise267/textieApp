import React from 'react';

export default function Chats({ rooms, openChat }) {


  return (
    <>
      {rooms.map((roomItem) => (
      <div className="roomContainer" key={roomItem._id}>
          <div key={roomItem._id} onClick={() => openChat(roomItem.room)}>
            <div>{roomItem.room}</div>
          </div>
      </div>
      ))}
    </>
  );
}
