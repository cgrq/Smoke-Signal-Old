import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem";
import { useEffect } from "react";

function ChannelFeed({ teamChannels, currentTeamId }) {
  return (
    <div>
      <h3>Channels</h3>
      <ul>
        {Object.values(teamChannels).map(
          (channel) =>
            channel.type === "channel" &&
            channel.teamId === currentTeamId && (
              <li key={channel.id}>
                <FeedItem
                  channelId={channel.id}
                  imageSrc={channel.imageUrl}
                  name={channel.name}
                />
              </li>
            )
        )}
      </ul>
    </div>
  );
}
export default ChannelFeed;
