from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..forms import ChannelForm
from app.models import Channel, db

channel_routes = Blueprint('channels', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@channel_routes.route('/all')
def all_channels():
    """
    GET all channels
    """
    channels = Channel.query.all()
    return {'channels': [channel.to_dict() for channel in channels]}
