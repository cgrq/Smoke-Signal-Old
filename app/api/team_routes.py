from flask import Blueprint, jsonify
from flask_login import login_required
from ..forms import TeamForm
from app.models import Team, db

team_routes = Blueprint('teams', __name__)

@team_routes.route('/', methods=['GET', 'POST'])
@login_required
def new_team():
    """
    Route to display form to create a team
    """
    form = TeamForm()

    if form.validate_on_submit(): # only runs for a 'POST' route
        team = Team()
        form.populate_obj(team)
        db.session.add(team)
        db.session.commit()

    teams = Team.query.all()

    return {"teams": [ team.to_dict() for team in teams ]}
