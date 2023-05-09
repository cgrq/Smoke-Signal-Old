from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import User
from ..utils import isValidUrl


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired()]) # added this
    lastName = StringField('lastName', validators=[DataRequired()]) # added this
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    status = StringField('status', validators=[DataRequired()])
    profileImageUrl = StringField('profileImageUrl', validators=[DataRequired(), URL()]) # added this
    password = StringField('password', validators=[DataRequired()])
