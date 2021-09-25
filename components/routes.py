from flask import render_template, url_for, flash, redirect, request
from components import app, db, bcrypt
from components.forms import RegistrationForm, LoginForm, UpdateAccountForm
from components.models import User, Laundromat, Drosher
from flask_login import login_user, current_user, logout_user, login_required

status = {
    0 : "Vacant",
    1 : "Full",
    2 : "Ready"
}

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')


@app.route("/laundry")
def laundry():
    return render_template('laundry.html')


@app.route("/register", methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)


@app.route("/logout")
def logout():
    logout_user()
    flash('You have successfully logged out!', 'success')
    return redirect(url_for('home'))


@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if current_user.username != form.username.data or current_user.email != form.email.data:
            current_user.username = form.username.data
            current_user.email = form.email.data
            db.session.commit()
            flash('Your account has been updated!', 'success')
        else:
            flash('No change detected for update.', 'info')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    return render_template('account.html', title='Account', form=form)


@app.route("/dorm<dorm_id>")
def laundromat(dorm_id):
    dorm = Laundromat.query.filter_by(id=dorm_id).first()
    washers = dorm.droshers.filter_by(is_washer=True).all()
    dryers = dorm.droshers.filter_by(is_washer=False).all()
    return render_template('laundromat.html', dorm=dorm, washers=washers, dryers=dryers)


# @app.route("/dorm<dorm_id>/unit<drosher_id>/load/new")
# def create_load(dorm_id, drosher_id):
#     form = CreateLoadForm(drosher_id)
#     return render_template('create_load.html', title='Next Load', form=form)
