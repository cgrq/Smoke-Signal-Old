import enum
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelType(enum.Enum):
    channel = 'channel'
    direct_message = 'direct_message'

class ChannelMemberships(db.Model):
    __tablename__ = 'channel_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)

    # Table Keys
    type = db.Column(db.Enum(ChannelType))
    user_joined = db.Column(db.DateTime, nullable=False,
                            default=datetime.now())

    # Foreign Keys
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)

    channels = db.relationship("Channel", back_populates="users")
    users = db.relationship("User", back_populates="channels")
