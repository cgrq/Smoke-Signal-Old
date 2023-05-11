import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { getChannelMessagesThunk } from "../../store/messages";

let socketio;

function MessageFeed({ channelId }) {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.channelMessages);

  // const [messages, setMessages] = useState(msgs);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {}, [channelId]);

  useEffect(() => {
    dispatch(getChannelMessagesThunk(channelId)).then(() => setIsLoaded(true));

    socketio = io();
    socketio.emit("join", channelId);

    // socketio.on("message", (channelId) => {
      // console.log("CHANNEL =>", channelId);
    // });

    socketio.on(`message received`, async () => {
      // console.log("***MESSAGE RECIEVED IN THE FEED***");
      dispatch(getChannelMessagesThunk(channelId));
    });

    return () => {
      // console.log("WE:RE DISCONNECTING");
      // console.log("THESE OUR MESSAGES", messages)
      socketio.disconnect();
    };
  }, [channelId]);

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
