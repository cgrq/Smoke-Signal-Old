import enum
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ChannelType(enum.Enum):
    channel = 'channel'
    direct_message = 'direct_message'
