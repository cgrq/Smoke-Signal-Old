import DeleteMessage from "../../DeleteMessage";
import EditMessage from "../../EditMessage";
import OpenModalButton from "../../OpenModalButton";

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
          <>
            <OpenModalButton
              buttonText={"Edit"}
              modalComponent={<EditMessage message={message} />}
            />

            <OpenModalButton
              buttonText={"Delete"}
              modalComponent={<DeleteMessage message={message} />}
            />
          </>
        )}
      </div>
    </li>
  );
}
