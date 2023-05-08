import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChannelThunk,
  editChannelThunk,
  getAllChannelsThunk,
} from "../../store/channels";
import { useHistory, useParams } from "react-router-dom";

const CreateChannel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const allChannels = useSelector((state) => state.channelsReducer.allChannels);

  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [teamId, setTeamId] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("USE EFFECT");
    dispatch(getAllChannelsThunk()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && id) {
      const channel = allChannels[id];
      console.log(`HERE'S OUR CHANNEL ${channel.name}`);

      if (channel) {
        setName(channel.name);
        setDescription(channel.description);
        setType(channel.type);
        setImageUrl(channel.imageUrl);
        setTeamId(channel.teamId);
      }
    }
  }, [isLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChannel = {
      name,
      description,
      type,
      imageUrl,
      teamId,
    };

    let channel;
    if (id) {
      newChannel.id = id;
      channel = await dispatch(editChannelThunk(newChannel));
    } else {
      channel = await dispatch(createChannelThunk(newChannel));
    }

    if (channel.errors) {
      setErrors(channel);
      return;
    }

    history.push("/user/channels");
  };

  return (
    <>
      <h1>{id ? "Update" : "Create New"} Channel:</h1>

      {Object.values(errors) &&
        Object.values(errors).map((error) => (
          <div key={error}>
            <p>{error}</p>
          </div>
        ))}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Name
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Description
          <input
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Type
          <input
            name="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>

        <label>
          Image URL
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <label>
          Team ID
          <input
            name="teamId"
            type="text"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateChannel;
