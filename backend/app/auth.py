from app.models import User
from app import db
import bcrypt

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

def check_password(password, password_hash):
    return bcrypt.checkpw(password.encode('utf-8'), password_hash)

def register_user(username, email, password):
    if User.query.filter_by(username=username).first():
        return False, "Username already exists"
    
    if User.query.filter_by(email=email).first():
        return False, "Email already exists"

    password_hash = hash_password(password)
    user = User(username=username, email=email, password_hash=password_hash)
    db.session.add(user)
    db.session.commit()
    return True, "User registered successfully" 