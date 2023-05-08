from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from ..forms import ChannelForm
from app.models import db, Channel, ChannelMembership

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


@channel_routes.route('/user')
@login_required
def user_channels():
    """
    GET user channels
    """
    user_id = current_user.id

    user_channel_memberships = ChannelMembership.query.where(
        ChannelMembership.user_id == user_id)

    channel_ids = [
        membership.channel_id for membership in user_channel_memberships]

    print(f"\nCHANNEL IDS => {channel_ids}\n")

    channels = Channel.query.all()

    channels = [channel for channel in channels if channel.id in channel_ids]

    return {'channels': [channel.to_dict() for channel in channels]}
