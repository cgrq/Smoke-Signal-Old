import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem";
import { useEffect } from "react";

function ChannelFeed({userChannels}) {


    return (
        <div>
            <h3>Channels</h3>
            <ul>
                {
                    Object.values(userChannels).map(channel => (
                        (channel.type === "channel") && (
                            <li key={channel.id}>
                                <FeedItem channelId={channel.id} imageSrc={channel.imageUrl} name={channel.name} />
                            </li>)
                        )
                    )
                }
            </ul>
        </div>
    )
}
export default ChannelFeed;
