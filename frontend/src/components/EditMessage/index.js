import { useDispatch } from "react-redux";
import InputField from "../InputField";
import { useState } from "react";
import {
  editMessageThunk,
  getChannelMessagesThunk,
} from "../../store/messages";
import { useModal } from "../../context/Modal";

const EditMessage = ({ message }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [newMessage, setNewMessage] = useState(message.message);

  const handleSubmit = async (e) => {
    e.preventDefault();

    message.message = newMessage;
    message.channelId = message.channel_id;
    await dispatch(editMessageThunk(message));

    await dispatch(getChannelMessagesThunk(message.channelId));

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
