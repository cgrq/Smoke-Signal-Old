import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteChannelThunk, getUserChannelsThunk, resetCurrentChannel } from "../../store/channels";
import "./DeleteChannelModal.css";

function DeleteChannelModal({id }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = async () => {

    const data = await dispatch(deleteChannelThunk(id));

    if (data) {
      setErrors(data);
    } else {
      await dispatch(getUserChannelsThunk());
      dispatch(resetCurrentChannel());
      closeModal();
    }

  };

  return (
    <>
      <h1>Delete this channel?</h1>

        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>

    </>
  );
}

export default DeleteChannelModal;
