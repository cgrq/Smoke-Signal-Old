from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, URL
from app.models import Team


class TeamForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[URL()])
