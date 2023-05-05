from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


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
    team_image_url = db.Column(db.String(255))

    # Methods
    def __repr__(self):
        return f'<Team id: {self.id}, name: {self.name} :: {self.created_at}>'
