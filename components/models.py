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

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Laundromat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), nullable=False)
    droshers = db.relationship('Drosher', backref='laundromat', lazy="dynamic")

    def __repr__(self):
        return f"Laundromat('{self.name}')"

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Drosher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_washer = db.Column(db.Boolean, default=True, nullable=False)
        #If machine is a washer, true. If it is a dryer, false
    end_time = db.Column(db.Integer, default=0, nullable=False)
        #Time when cycle is complete, is 0 when not running # -1 when out of service?
    local_id = db.Column(db.Integer, default=0)
        #Number on washer at location
    laundromat_id = db.Column(db.Integer, db.ForeignKey('laundromat.id'), nullable=False)
    explicitly_filled = db.Column(db.Boolean, default=True, nullable=False)
        #If user specified the local_id of the machine they are using, this is true. False if not.

    def __repr__(self):
        return f"Drosher('{self.id}', '{self.is_washer}', '{self.end_time}')"

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}
