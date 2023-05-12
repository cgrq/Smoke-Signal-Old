import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editMessageThunk, getUserMessagesThunk, getChannelMessagesThunk } from "../../store/messages";
import InputField from "../InputField";
import "./EditMessageModal.css";

function EditMessageModal({ id, body, username }) {
  const dispatch = useDispatch();

  const currentChannel = useSelector((state) => state.channels.currentChannel)
  const sessionUser = useSelector((state) => state.session.user);


  const [newBody, setNewBody] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {
    if (id) {
      setNewBody(body);
    }
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = {
      id,
      message: newBody,
      channelId: currentChannel.id,
      userId: sessionUser.id
    };

    const data = await dispatch(editMessageThunk(newMessage));


    if (data) {
      setErrors(data);
    } else {
      await dispatch(getUserMessagesThunk)
      await dispatch(getChannelMessagesThunk)

      closeModal();
    }

  };

  return (
    <>
      <h1>Edit Message</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <InputField
          label="Message"
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Edit message"
          required={true}
        />

        <button type="submit">Edit message</button>

      </form>
    </>
  );
}

export default EditMessageModal;
