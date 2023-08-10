import React, {useState, useMemo, useEffect} from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

export default function Chat({username, userId, socket, room, roomId}) {

      const [message, setMessage] = useState("");
      const [messageList, setMessageList] = useState([]);
      const time = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()

      const fetchAndDisplayMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/getMessage/${roomId}`);
          console.log(response.data);
          setMessageList(response.data);
        } catch (error) {
          console.log(error);
        }
      };


    const sendMessage = async() => {
      if(message.length!==0){
        const messageData = {
          roomid : roomId,
          userid : userId,
          message : message,
          time : time
        }
        await socket.emit("sendMessage", messageData);
        setMessageList((list)=>[...list, messageData]);
        setMessage("")

        await axios.post(`http://localhost:5000/addMessage/${roomId}/${userId}`,{
          message : message,
          time : time
        }).then((result) => {
          console.log(result.data);
        }).catch((err) => {
          console.log(err);
        });
      }
      else{
        alert("message is empty")
      }
    }

    useEffect(()=>{
      socket.on("recieveMessage", (messageData)=>{
        setMessageList((list)=> [...list, messageData])
      })

      fetchAndDisplayMessages();
      
    },[socket, roomId, userId])

  return (
    <>
        <div className="chat-window">
          <div className="chat-header">
            <h1 className="custom-text">{room}</h1>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  key={messageContent.time}
                  className="message custom-text"
                  id={userId === messageContent.userid ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="author">{messageContent.userid}</p>
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
