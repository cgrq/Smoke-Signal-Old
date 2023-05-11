import os

from flask_login import current_user, login_required
from flask_socketio import SocketIO, emit, join_room, leave_room
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
socketio = SocketIO(cors_allowed_origins=origins)


# @socketio.on("message sent")
# @login_required
# def handle_connection(channel_id):
#     print(f"\n****You are connected on {channel_id}\n")
#     emit(f"message sent from {channel_id['channelId']}", channel_id, broadcast=True)
#     emit("message sent", channel_id)

@socketio.on('connect')
@login_required
def on_connect():
    # join_room("General")
    # joing_room(f"Channel {channel_id}")
    # print("\nJOINED ROOM GENERAL\n", data)

    # send("YOU'RE CONNECTED", to='General')
    socketio.emit("message", "THIS IS DATA", room="General")
    # emit("message sent", broadcast=True)


@socketio.on('join')
@login_required
def on_join(channel_id):
    join_room(f"Channel {channel_id}")
    print(f"\nROOM NUMBER {channel_id}\n")

    socketio.emit("message", channel_id,
                  room=f"{channel_id}")


@socketio.on('message sent')
@login_required
def message_sent(data):
    print("\nMESSAGE RECEIVED ON BACKEND\n", data)
    socketio.emit("message received", data, room=f"Channel {data['room']}")
