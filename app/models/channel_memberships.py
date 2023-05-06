from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelMemberships(db.Model):
    __tablename__ = 'channel_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    TYPES = ['channel', 'direct_message']

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)

    # Table Keys
    type = db.Column(db.Enum(*TYPES, name='Type'))
    user_joined = db.Column(db.DateTime, nullable=False,
                            default=datetime.now())

    # Foreign Keys
    channel_id = db.Column(db.Integer, db.ForeignKey(
        'channels.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)

    channels = db.relationship("Channel", back_populates="users")
    users = db.relationship("User", back_populates="channels")
