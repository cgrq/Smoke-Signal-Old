export default function Message({body, username, timestamp}) {
    return (
        <li className="chat-interface-message">
            <div className="chat-interface-message-body">{body}</div>
            <div className="chat-interface-message-details">
                <div className="chat-interface-message-sender">{username}</div>
                <div className="chat-interface-message-timestamp">{timestamp}</div>
            </div>
        </li>
    )
}
