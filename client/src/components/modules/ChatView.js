import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
import { socket } from "../../client-socket";
import { useNavigate } from "@reach/router";
import "./ChatView.css";

const ChatView = (props) => {
  const [chatBubbles, setChatBubbles] = useState([]);
  const [temp_msg, setTempMsg] = useState("");

  const handleInput_msg = (event) => {
    setTempMsg(event.target.value);
  };

  const handleSend = () => {
    post("/api/sendmessage", {
      chatId: props.chatId,
      content: temp_msg,
      sender: props.userId,
    });
    setTempMsg("");
  };

  const navigate = useNavigate();
  const routeProfile = () => {
    navigate("/profile/");
  };

  let chats = [];
  const async_process = async () => {
    await get("/api/getchat", { chatId: props.chatId }).then(async (chat) => {
      for (const [index, msg] of chat.messages.entries()) {
        await get("/api/getmessage", { messageId: msg }).then(async (message) => {
          await get("/api/getuser", { id: message.sender }).then((user) => {
            if (message.sender == props.userId) {
              let userBubble = (
                <div className="u-reverseFlex ">
                  <div key={index} className="UserBubble-container">
                    {message.content}
                  </div>
                </div>
              );
              chats.push(userBubble);
            } else {
              let chatBubble = (
                <div key={index} className="u-flex u-flex-alignCenter">
                  <img
                    src={user.pfp}
                    onClick={() => {
                      props.setCurrentProfileId(message.sender);
                      routeProfile();
                    }}
                    className="u-pointer Chat-icon"
                  ></img>
                  <div className="ChatBubble-container">{message.content}</div>
                </div>
              );
              chats.push(chatBubble);
            }
          });
        });
      }
      setChatBubbles(chats);
    });
  };

  // listen for new messages
  socket.on("newmessage", (msg) => {
    async_process();
  });

  useEffect(() => {
    async_process();
  }, []);

  return (
    <div>
      <div className="messageView">
        {chatBubbles.length > 0 ? (
          chatBubbles
        ) : (
          <p className="u-textCenter">fetching messages...</p>
        )}
      </div>
      <div className="Chatbox-container">
        <input
          type="text"
          value={temp_msg}
          placeholder="enter a new message"
          size="123"
          onChange={handleInput_msg}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
        ></input>
        <button className="Chatbox-send u-pointer" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatView;
