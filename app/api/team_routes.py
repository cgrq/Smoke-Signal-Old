from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..forms import TeamForm
from app.models import Team, db

team_routes = Blueprint('teams', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@team_routes.route('/new', methods=['POST'])
@login_required
def new_team():
    """
    Route to display form to create a team
    """
    form = TeamForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit(): # only runs for a 'POST' route
        p = request.json
        team = Team(
            name=p["name"],
            image_url=p["imageUrl"]
        )

        db.session.add(team)
        db.session.commit()

        return {"team":team.to_dict()}

    return {"errors":validation_errors_to_error_messages(form.errors)}, 401
