function MessageInputs() {
    return (
        <div className="chat-interface-message-inputs-wrapper">
            <form className="chat-interface-message-form">
                <textarea className="chat-interface-message-input" />
                <button className="chat-interface-message-button" type="submit">Send</button>
            </form>
        </div>
    )
}
export default MessageInputs
