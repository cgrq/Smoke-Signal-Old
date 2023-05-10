import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem";
import { useEffect } from "react";

function DirectMessageFeed({userChannels, currentTeam}) {

    return (
        <div>
            <h3>Direct Messages</h3>
            <ul>
                {
                    Object.values(userChannels).map(channel => (
                        (channel.type === "dm" && channel.teamId === currentTeam.id) && (
                            <li key={channel.id}>
                                <FeedItem channelId={channel.id}  imageSrc={channel.imageUrl} name={channel.name} />
                            </li>)
                        )
                    )
                }
            </ul>
        </div>
    )
}
export default DirectMessageFeed;
