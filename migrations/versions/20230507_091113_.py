"""empty message

Revision ID: 970f6e880428
Revises: eed96c05f45c
Create Date: 2023-05-07 09:11:13.615096

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '970f6e880428'
down_revision = 'eed96c05f45c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.drop_constraint('fk_channels_team_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_channels_team_id_teams'), 'teams', ['team_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('channels', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_channels_team_id_teams'), type_='foreignkey')
        batch_op.create_foreign_key('fk_channels_team_id_users', 'users', ['team_id'], ['id'])

    # ### end Alembic commands ###