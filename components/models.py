from datetime import datetime
from components import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    verified = db.Column(db.Boolean, default=False, nullable=False)
    current_drosher = db.relationship('Drosher', backref='user', lazy=True)
    default_laundromat_id = db.Column(db.Integer, db.ForeignKey('laundromat.id'), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Laundromat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    university = db.Column(db.String(60), nullable=False)
    dorm = db.Column(db.String(60), nullable=False)
    floor = db.Column(db.Integer, default=-1, nullable=False)
    droshers = db.relationship('Drosher', backref='laundromat', lazy="dynamic")
    users = db.relationship('User', backref='laundromat', lazy="dynamic")

    def __repr__(self):
        return f"Laundromat('{self.university}', '{self.dorm}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Drosher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_washer = db.Column(db.Boolean, default=True, nullable=False)
        # If machine is a washer, true. If it is a dryer, false
    end_time = db.Column(db.Integer, default=0, nullable=False)
        # Time when cycle is complete, is 0 when not running # -1 when out of service?
    local_id = db.Column(db.Integer, default=0)
        # Number on washer at location
    laundromat_id = db.Column(db.Integer, db.ForeignKey('laundromat.id'), nullable=False)
        # If user specified the local_id of the machine they are using, this is true. False if not.
    used_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Drosher('{self.id}', '{self.is_washer}', '{self.end_time}')"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
