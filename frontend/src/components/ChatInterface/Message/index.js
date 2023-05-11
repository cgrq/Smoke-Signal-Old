import { useDispatch } from "react-redux";
import EditMessage from "../../EditMessage";
import OpenModalButton from "../../OpenModalButton";
import { deleteMessageThunk } from "../../../store/messages";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socketio;

export default function Message({ body, username, timestamp, user, message }) {
  const dispatch = useDispatch();

  const muid = message.user_id;
  const uid = user.id;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, []);

  const onClick = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure?")) {
      dispatch(deleteMessageThunk(muid));
      socket.emit("message sent", { room: message.channelId });
    }
  };

  return (
    <li className="chat-interface-message">
      <div className="chat-interface-message-body">{body}</div>
      <div className="chat-interface-message-details">
        <div className="chat-interface-message-sender">{username}</div>
        <div className="chat-interface-message-timestamp">{timestamp}</div>
        {uid === muid && (
          <>
            <OpenModalButton
              buttonText={"Edit"}
              modalComponent={<EditMessage />}
            />
            <button onClick={onClick}>Delete?</button>
          </>
        )}
      </div>
    </li>
  );
}
