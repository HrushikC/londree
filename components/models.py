from datetime import datetime
from components import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    loads = db.relationship('Load', backref='owner', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Laundromat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(60), nullable=False)
    sub_location = db.Column(db.String(30), unique=True, nullable=False)
    droshers = db.relationship('Drosher', backref='laundromat', lazy="dynamic")

    def __repr__(self):
        return f"Laundromat('{self.sub_location}')"


class Drosher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_washer = db.Column(db.Boolean, default=True, nullable=False)
    available = db.Column(db.Boolean, default=True, nullable=False)
    laundromat_id = db.Column(db.Integer, db.ForeignKey('laundromat.id'), nullable=False)
    load = db.relationship('Load', backref='drosher', lazy=True)

    def __repr__(self):
        return f"Drosher('{self.is_washer}', '{self.available}')"


class Load(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    duration = db.Column(db.Integer, nullable=False)  # minutes
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    drosher_id = db.Column(db.Integer, db.ForeignKey('drosher.id'), nullable=False)
    status = db.Column(db.Integer, nullable=False) 

    # Need to figure out a choice column for STATUS.

    def __repr__(self):
        return f"Load(Owner: '{self.user_id}', Drosher: '{self.drosher_id}', " \
               f"Started: '{self.created_time}', Duration(mins): '{self.duration}')"
