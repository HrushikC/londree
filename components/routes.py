from flask import render_template, url_for, flash, redirect, request, jsonify
from components import app, db, bcrypt
from components.forms import RegistrationForm, LoginForm, UpdateAccountForm, CreateLoadForm
from components.models import User, Laundromat, Drosher
from components.schemas import UserSchema, LaundromatSchema, DrosherSchema
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime


@app.route("/laundromats", methods=['GET'])
def get_laundromats():
    laundromats = Laundromat.query.all()
    laundromats_schema = LaundromatSchema(many=True)
    laundromats_data = laundromats_schema.dump(laundromats)
    return jsonify(laundromats=laundromats_data)


@app.route("/laundromat/<int:laundromat_id>", methods=['GET'])
def laundromat(laundromat_id):
    droshers = Drosher.query.filter_by(laundromat_id=laundromat_id).all()
    droshers_schema = DrosherSchema(many=True)
    droshers_data = droshers_schema.dump(droshers)
    return jsonify(droshers=droshers_data)


@app.route("/startLoad", methods=['POST'])
def startLoad():
    """
    Body:
        isWash: boolean
        laundromat_id: integer
        drosher_local_id: integer
    """
    data = request.get_json(silent=True)
    is_wash = data.get('isWash')
    laundromat_id = data.get('laundromat_id')
    drosher_local_id = data.get('drosher_local_id')
    # should have a check here that makes sure that all fields are filled correctly
        # check all vars, not just local_id
    if not drosher_local_id or drosher_local_id < 0:
        return jsonify({"message": "Load unable to start. drosher_local_id not sent or formatted incorrectly"})

    if is_wash:
        runtime = 60*30
    else:
        runtime = 60*60
    drosher = Drosher.query.filter_by(laundromat_id=laundromat_id, is_washer=is_wash, end_time=0, local_id=drosher_local_id).first()
    if not drosher:
        return jsonify({"status": 0, "message": "Load unable to start. Maybe the local_id is incorrect or the washer is still running?"})
    drosher.end_time = int(datetime.now().strftime('%S')) + runtime
    db.session.add(drosher)
    db.session.commit()
    return jsonify({"status": 1, "message": "Load started successfully", "drosher_id": drosher.id, "end_time": drosher.end_time})


@app.route("/emptyLoad", methods=['POST'])
def emptyLoad():
    """
    # How do you ensure that nobody stops another person's load
      # Might need users
      # People stop other people's loads without their permission in real life too
    Error would be caused if
    1. u1 set a load
    2. u1 physically empties the load but does not log it
    3. u2 adds another load to that washer                                                3. u2 adds another load
    4. u1 recognizes their mistake and unloads on the app while u2's load is still in
    """
    data = request.get_json(silent=True)
    drosher_id = data.get('drosher_id')
    drosher = Drosher.query.filter_by(id=drosher_id).first()
    if drosher.end_time == 0:
        return jsonify({"message": "Drosher already empty"})
    drosher.end_time = 0
    db.session.add(drosher)
    db.session.commit()
    return jsonify({"message": "Load emptied successfully"})

# ADMIN ROUTES
def addLaundromat(lm_name):
    new_lm = Laundromat(name=lm_name)
    db.session.add(new_lm)
    db.session.commit()

def addDrosher(lm_id, local_id, is_washer):
    new_drosh = Drosher(is_washer=is_washer, end_time=0, laundromat_id=lm_id, local_id=local_id, explicitly_filled=True)
    db.session.add(new_drosh)
    db.session.commit()
