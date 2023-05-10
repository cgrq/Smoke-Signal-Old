import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteChannelThunk, getUserChannelsThunk } from "../../store/channels";
import { Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CreateChannel from "../CreateChannelModal";

const UserChannels = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const channels = useSelector((state) => state.channels.userChannels);

  useEffect(() => {
    dispatch(getUserChannelsThunk()).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  if (!isLoaded) return <>Not Loaded</>;

  return (
    <div>
      <h1>User Channels:</h1>
      {Object.values(channels).map((channel) => (
        <div key={channel.id}>
          <h2>Name: {channel.name}</h2>
          <p>Id: {channel.id}</p>
          <p>Description: {channel.description}</p>
          <p>Image URL: {channel.imageUrl}</p>
          <p>Team ID: {channel.teamId}</p>

          <OpenModalButton
            buttonText={"Edit"}
            modalComponent={<CreateChannel id={channel.id} />}
          />

          <Link to={`/channels/${channel.id}`}>View</Link>

          <button
            onClick={() => {
              if (window.confirm("Are You Sure?")) {
                dispatch(deleteChannelThunk(channel.id));
                setIsLoaded(false);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserChannels;
