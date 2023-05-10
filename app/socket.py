import os

from flask_login import current_user, login_required
from flask_socketio import SocketIO, emit
from app.models import Message, db

# Set cors policy
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://smoke-signal.onrender.com/",
        "https://smoke-signal.onrender.com/",
    ]
else:
    origins = "*"

# Socket IO instance
socket = SocketIO(cors_allowed_origins=origins)

# Handle channel messages


@socket.on("message sent")
@login_required
def handle_message(message):
    # print("\nTHIS IS A MESSAGE =>\n", message)
    # print("\nTHIS IS OUR CURRENT USER =>\n", current_user)
    # print("\nTHIS IS OUR CURRENT USER ID =>\n", current_user.id)

    if message['message'] != "user connected":
        msg = Message(
            message=message["message"],
            user_id=current_user.id,
            channel_id=message["channelId"],
        )

        db.session.add(msg)
        db.session.commit()

    messages = Message.query.where(
        Message.channel_id == message["channelId"]).all()

    # print("\n----MESSAGE RECEIVED----\n")

    emit('updated messages', {"messages": [
         message.to_dict() for message in messages]}, broadcast=True)
