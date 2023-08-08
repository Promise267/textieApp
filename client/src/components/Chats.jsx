import React from 'react';

export default function Chats({ rooms, openChat }) {
  return (
    <>
      {rooms.map((roomItem) => {
        return (
          <div className="roomContainer" key={roomItem._id}>
            <div onClick={() => {
              openChat(roomItem.id, roomItem.name)}}>
              <div>{roomItem.name}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}