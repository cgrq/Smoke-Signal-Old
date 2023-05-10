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


@socket.on("message")
@login_required
def handle_message(msg):
    if msg.isinstance(Message):
        message = Message(
            message=msg.message,
            user_id=current_user.id,
            channel_id=msg.channel_id,
        )

        db.session.add(message)
        db.session.commit()

    emit("message", msg, broadcast=True)
