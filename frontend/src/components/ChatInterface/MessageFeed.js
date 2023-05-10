import { useSelector } from "react-redux"
import Message from "./Message"
function MessageFeed() {
    const messages = useSelector((state)=>state.messages.channelMessages)
    return (
        <div className="chat-interface-message-feed">
            <ul className="chat-interface-message-wrapper">
                {
                    Object.values(messages).map((message)=>(
                        <Message body={message.message} username={message.username} timestamp={message.sent_at} key={message.id}/>
                    ))
                }
            </ul>
        </div>
    )
}
export default MessageFeed
