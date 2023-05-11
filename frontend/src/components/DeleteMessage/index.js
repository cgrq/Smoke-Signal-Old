import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import "./DeleteMessage.css";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteMessageThunk } from "../../store/messages";

let socketio;

const DeleteMessage = ({ message }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState("");
  const { closeModal } = useModal();

  useEffect(() => {
    socketio = io();

    setSocket(socketio);

    return () => socketio.disconnect();
  }, []);

  const handleYes = async (e) => {
    e.preventDefault();

    await dispatch(deleteMessageThunk(message.id));
    socket.emit("message sent", { room: message.channel_id });

    closeModal();
  };

  const handleNo = (e) => {
    e.preventDefault();

    closeModal();
  };

  return (
    <div>
      <h1>Are you sure?</h1>

      <button onClick={handleYes}>Yes</button>

      <button onClick={handleNo}>No</button>
    </div>
  );
};

export default DeleteMessage;
