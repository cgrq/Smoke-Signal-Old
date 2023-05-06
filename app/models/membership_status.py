import enum
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class MembershipStatus(enum.Enum):
    owner = 'owner'
    moderator = 'moderator'
    member = 'member'
