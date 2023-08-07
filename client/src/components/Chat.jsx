import React, {useState, useMemo, useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({username, socket, room}) {
  
      const [message, setMessage] = useState("");
      const [messageList, setMessageList] = useState([]);

    useMemo(()=>{
      socket.on("recieveMessage", (messageData)=>{
        setMessageList((list)=> [...list, messageData])
      })
    },[socket])

    const sendMessage = async() => {
      if(message.length!==0){
        const messageData = {
          room : room,
          username : username,
          message : message,
          time : new Date(Date.now()).getHours() + 
          ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit("sendMessage", messageData);
        setMessageList((list)=>[...list, messageData]);
        setMessage("")
      }
      else{
        alert("message is empty")
      }
    }

  return (
    <>
        <div className="chat-window">
          <div className="chat-header">
            <h1 className="custom-text">Chat Room: {room}</h1>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  key={messageContent.time}
                  className="message custom-text"
                  id={username === messageContent.username ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="author">{messageContent.username}</p>
                      <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
          </div>
          <div className="chat-footer">
              <input type="text" 
                className="inputBox"
                placeholder="Message...."
                onChange={(e)=>{
                  setMessage(e.target.value);
                }}
                value={message}
              />
              <button type="submit" 
                className="sendbtn"
                onClick={sendMessage}
              >
                  Send
              </button>
          </div>
        </div>
    </>
  )
}
