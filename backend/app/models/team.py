from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .team_memberships import TeamMemberships


class Team(db.Model):
    __tablename__ = "teams"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    # Table Keys
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(150))
    image_url = db.Column(db.String(255))

    # Foreign Keys
    users = db.relationship(TeamMemberships, back_populates="users")

    # Methods
    def __repr__(self):
        return f'<Team id: {self.id}, name: {self.name} :: {self.created_at}>'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "team_image_url": self.team_image_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }