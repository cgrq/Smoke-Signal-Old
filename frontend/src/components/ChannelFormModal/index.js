import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editChannelThunk, getUserChannelsThunk, createChannelThunk } from "../../store/channels";
import InputField from "../InputField";
import "./ChannelFormModal.css";

function ChannelFormModal({ id, componentType, title }) {
  const dispatch = useDispatch();

  const userChannels = useSelector((state) => state.channels.userChannels);
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [teamId, setTeamId] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (componentType === "update" && userChannels) {
      const channel = userChannels[id];

      if (channel) {
        setName(channel.name);
        setDescription(channel.description);
        setType(channel.type);
        setImageUrl(channel.imageUrl);
        setTeamId(channel.teamId);
      }
    }
  }, [userChannels]);

  useEffect(()=>{
    dispatch(getUserChannelsThunk(id))
  },[teamId])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChannel = {
      id,
      name,
      description,
      type,
      imageUrl,
      teamId,
    };

    let data;
    if (componentType === 'create') {
      data = await dispatch(createChannelThunk(newChannel));
    } else {
      data = await dispatch(editChannelThunk(newChannel));
    }

    if (data) {
      setErrors(data);
    } else {
      await dispatch(getUserChannelsThunk())
      closeModal();
    }

  };

  return (
    <>
      <h1>{title}</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Channel name"
          required={true}
        />

        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required={true}
        />

        <InputField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Channel type"
          required={true}
        />

        <InputField
          label="Channel Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image to represent the channel"
          required={false}
        />

        <InputField
          label="Team Id"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          placeholder="Associated Team ID (to be removed/abstracted)"
          required={false}
        />

        <button type="submit">{componentType === 'create' ? 'Create ' : 'Update '}Channel</button>

      </form>
    </>
  );
}

export default ChannelFormModal;
