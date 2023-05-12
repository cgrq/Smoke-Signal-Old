import DeleteMessage from "../../DeleteMessage";
import EditMessageModal from "../../EditMessageModal";
import OpenModalButton from "../../OpenModalButton";
import OpenDeleteModalButton from "../../OpenDeleteModalButton";

export default function Message({ body, username, timestamp, user, message }) {
  const muid = message.user_id;
  const uid = user.id;

  return (
    <li className="chat-interface-message">
      <div className="chat-interface-message-body">{body}</div>
      <div className="chat-interface-message-details">
        <div className="chat-interface-message-sender">{username}</div>
        <div className="chat-interface-message-timestamp">{timestamp}</div>
        {uid === muid && (
          <div className="chat-interface-message-button-wrapper">
            <OpenModalButton
              buttonText={"Edit"}
              modalComponent={<EditMessageModal message={message} />}
            />

            <OpenDeleteModalButton
              buttonText={"Delete"}
              modalComponent={<DeleteMessage message={message} />}
            />
          </div>
        )}
      </div>
    </li>
  );
}
