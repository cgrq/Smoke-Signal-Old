import { useDispatch } from "react-redux";
import InputField from "../InputField";
import { useEffect, useState } from "react";
import { editMessageThunk } from "../../store/messages";
import { useModal } from "../../context/Modal";
import { io } from "socket.io-client";

let socketio;

const EditMessage = ({ message }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [newMessage, setNewMessage] = useState(message.message);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, [message.channelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    message.message = newMessage;
    message.channelId = message.channel_id;
    await dispatch(editMessageThunk(message));
    socket.emit("message sent", { room: message.channelId });

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        required={true}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditMessage;
