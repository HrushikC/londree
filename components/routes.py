from flask import render_template, url_for, flash, redirect, request, jsonify
from components import app, db, bcrypt
from components.forms import RegistrationForm, LoginForm, UpdateAccountForm, CreateLoadForm
from components.models import User, Laundromat, Drosher
from components.schemas import UserSchema, LaundromatSchema, DrosherSchema
from flask_login import login_user, current_user, logout_user, login_required
from datetime import datetime


@app.route("/")
def menu():
    return jsonify()


@app.route("/laundromat/<int:laundromat_id>", methods=['GET'])
def laundromat(laundromat_id):
    droshers = Drosher.query.filter_by(laundromat_id=laundromat_id).all()
    droshers_schema = DrosherSchema(many=True)
    droshers_data = droshers_schema.dump(droshers)
    return jsonify(droshers=droshers_data)


@app.route("/startLoad", methods=['POST'])
def startLoad():
    data = request.get_json(silent=True)
    print(data)
    type = data.get('type')
    laundromat_id = data.get('laundromat_id')
    drosher_local_id = data.get('drosher_local_id')

    if data.get('type') == 'wash':
        is_washer = True
        runtime = 60*30
    else:
        is_washer = False
        runtime = 60*60
    if drosher_local_id and drosher_local_id >= 0:
        drosher = Drosher.query.filter_by(laundromat_id=laundromat_id, is_washer=is_washer, end_time=0, local_id=drosher_local_id).first()
        if not drosher:
            return jsonify({"message": "Load unable to start. Maybe the local_id is incorrect or the washer is still running?"})
        drosher.explicitly_filled = True
    else:
        drosher = Drosher.query.filter_by(laundromat_id=laundromat_id, is_washer=is_washer, end_time=0).first()
        if not drosher:
            return jsonify({"message": "Load not started, no available machines found"})
        drosher.explicitly_filled = False
    drosher.end_time = datetime.now().strftime('%s') + str(runtime)
    db.session.add(drosher)
    db.session.commit()
    return jsonify({"message": "Load started successfully", "drosher_id": drosher.id})


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
