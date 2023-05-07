from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .channel_memberships import ChannelMembership


class Channel(db.Model):
    __tablename__ = "channels"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    # Table Keys
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(2000))
    type = db.Column(db.String(150))
    image_url = db.Column(db.String(255))

    # Foreign Keys
    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("teams.id")), nullable=False)

    users = db.relationship(ChannelMembership, back_populates="channels")


    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())


    # Methods
    def __repr__(self):
        return f'<Channel id:{self.id}, name:{self.name} :: {self.created_at}>'
