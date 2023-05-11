import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import {
  editChannelThunk,
  createChannelThunk,
  getTeamChannelsThunk
} from "../../store/channels";
import InputField from "../InputField";
import "./ChannelFormModal.css";

function ChannelFormModal({ id, componentType, title }) {
  const dispatch = useDispatch();

  const userChannels = useSelector((state) => state.channels.userChannels);
  const currentTeamId = useSelector((state) => state.teams.currentTeam.id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
      }
    }
  }, [userChannels]);

  useEffect(() => {
    dispatch(getTeamChannelsThunk(currentTeamId));
  }, [currentTeamId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChannel = {
      id,
      name,
      description,
      type,
      imageUrl,
      teamId: currentTeamId,
    };

    let data;
    if (componentType === "create") {
      data = await dispatch(createChannelThunk(newChannel));
    } else {
      data = await dispatch(editChannelThunk(newChannel));
    }

    if (data) {
      setErrors(data);
    } else {
      await dispatch(getTeamChannelsThunk(currentTeamId));
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

        <button type="submit">
          {componentType === "create" ? "Create " : "Update "}Channel
        </button>
      </form>
    </>
  );
}

export default ChannelFormModal;
