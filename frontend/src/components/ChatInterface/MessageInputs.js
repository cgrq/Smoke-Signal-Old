// import { useDispatch } from "react-redux";
// import {
//   createMessageThunk,
//   getChannelMessagesThunk,
// } from "../../store/messages";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// let socket;

// // function MessageInputs({ channelId, newMessage, setNewMessage }) {
// function MessageInputs({ channelId }) {
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     socket = io();

//     return () => socket.disconnect();
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const message = {
//       message: newMessage,
//       channelId,
//     };

//     // console.log("----Message emitted----");
//     socket.emit("message sent", message);

//     setNewMessage("");
//   };
//   return (
//     <div className="chat-interface-message-inputs-wrapper">
//       <form onSubmit={handleSubmit} className="chat-interface-message-form">
//         <textarea
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="chat-interface-message-input"
//         />
//         <button className="chat-interface-message-button" type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }
// export default MessageInputs;

import { useDispatch, useSelector } from "react-redux";
import {
  createMessageThunk,
  getChannelMessagesThunk,
} from "../../store/messages";

function MessageInputs({ channelId, newMessage, setNewMessage }) {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      message: newMessage,
      channelId,
    };

    await dispatch(createMessageThunk(message));
    await dispatch(getChannelMessagesThunk(channelId));
    setNewMessage("");
  };
  return (
    <div className="chat-interface-message-inputs-wrapper">
      <form onSubmit={handleSubmit} className="chat-interface-message-form">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-interface-message-input"
        />
        <button className="chat-interface-message-button" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default MessageInputs;
