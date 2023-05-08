import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteChannelThunk, getUserChannelsThunk } from "../../store/channels";
import { Link } from "react-router-dom";

const UserChannels = () => {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const channels = useSelector((state) => state.channelsReducer.userChannels);

  useEffect(() => {
    dispatch(getUserChannelsThunk()).then(() => setIsLoaded(true));
  }, [dispatch, isLoaded]);

  if (!isLoaded) return <>Not Loaded</>;

  console.log(channels);

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

          <Link to={`/channels/${channel.id}`}>Edit</Link>

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
