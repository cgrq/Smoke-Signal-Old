from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class TeamMemberships(db.Model):
    __tablename__ = 'team_memberships'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    STATUS = ['owner', 'moderator', 'member']

    # Common Keys
    id = db.Column(db.Integer, primary_key=True)

    # Table Keys
    status = db.Column(db.Enum(*STATUS, name="Status"))
    user_joined = db.Column(db.DateTime, nullable=False,
                            default=datetime.now())

    # Foreign Keys
    team_id = db.Column(db.Integer, db.ForeignKey(
        'teams.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), primary_key=True)

    teams = db.relationship("Team", back_populates="users")
    users = db.relationship("User", back_populates="teams")
