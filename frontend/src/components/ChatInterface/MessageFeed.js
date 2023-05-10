import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getChannelMessagesThunk } from "../../store/messages";

let socket;

function MessageFeed({ channelId }) {
  const dispatch = useDispatch();

  // const msgs = useSelector((state) => state.messages.channelMessages);

  // const [messages, setMessages] = useState(msgs);
  const [messages, setMessages] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getChannelMessagesThunk(channelId)).then(() => setIsLoaded(true));
  }, []);

  useEffect(() => {
    socket = io();

    socket.emit("message sent", { message: "user connected", channelId });

    socket.on("updated messages", (data) => {
      // console.log("MESSAGE RECIEVED =>", data);
      const msgs = {};
      data["messages"].forEach((message) => (msgs[message.id] = message));

      // console.log(`THESE ARE THE MESSAGES =>`, msgs);
      setMessages(msgs);
    });

    return () => socket.disconnect();
  }, []);

  if (!isLoaded) return <>Loading...</>;

  return (
    <div className="chat-interface-message-feed">
      <ul className="chat-interface-message-wrapper">
        {Object.values(messages).map((message) => (
          <div key={message.id}>
            <Message
              body={message.message}
              username={message.username}
              timestamp={message.sent_at}
              key={message.id}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}
export default MessageFeed;
