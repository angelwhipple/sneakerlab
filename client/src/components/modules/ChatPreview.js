import { get } from "../../utilities";
import "./ChatPreview.css";
import React, { useState, useEffect } from "react";

const ChatPreview = (props) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [selectedChat, setSelectedChat] = useState("");

  useEffect(() => {
    get("/api/getchat", { chatId: props.chatId }).then((chat) => {
      let msg = chat.messages[chat.messages.length - 1];
      get("/api/getmessage", { messageId: msg }).then((message) => {
        get("/api/getuser", { id: message.sender }).then((user) => {
          setImage(user.pfp);
          setName(user.displayName);
          setLastMsg(message.content);
        });
      });
    });
  }, []);

  return selectedChat == props.chatId ? (
    <div
      onClick={() => {
        props.setSelectedChat(props.chatId);
        setSelectedChat(props.chatId);
      }}
      className="ChatPreviewContainer-selected u-pointer"
    >
      <div className="u-flex">
        <img className="ChatPreview-icon" src={image}></img>
        <p>
          {name}: {lastMsg}
        </p>
      </div>
    </div>
  ) : (
    <div
      onClick={() => {
        props.setSelectedChat(props.chatId);
        setSelectedChat(props.chatId);
      }}
      className="ChatPreview-container u-pointer"
    >
      <div className="u-flex">
        <img className="ChatPreview-icon" src={image}></img>
        <p>
          {name}: {lastMsg}
        </p>
      </div>
    </div>
  );
};

export default ChatPreview;
