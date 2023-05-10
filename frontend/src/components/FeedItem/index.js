import OpenModalButton from "../OpenModalButton"
import ChannelFormModal from "../ChannelFormModal";
import DeleteChannelModal from "../DeleteChannelModal";
import "./FeedItem.css"

export default function FeedItem({channelId, imageSrc, name, onClick }) {


    if(!channelId) return null

    return (
        <>
            <div onClick={onClick} className="feed-item-wrapper clickable">
                <img src={imageSrc} />
                <p>{name}</p>
            </div>
            <div>
                <OpenModalButton
                    buttonText="Edit"
                    modalComponent={
                        <ChannelFormModal id={channelId} componentType="update" title="Update channel" />
                    }
                />
                <OpenModalButton
                    buttonText="Delete"
                    modalComponent={
                        <DeleteChannelModal id={channelId} />
                    }
                />
            </div>
        </>
    )
}
