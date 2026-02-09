from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from app import db
from app.models import User
from werkzeug.security import check_password_hash
from datetime import timedelta
from flask import Blueprint, jsonify

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password'])
    )
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login request data:", data)  # Debug log
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Missing email or password'}), 400
        
    user = User.query.filter_by(email=data.get('email')).first()
    print("Found user:", user)  # Debug log
    
    if not user:
        # List all users for debugging
        all_users = User.query.all()
        print("All users in database:", all_users)  # Debug log
        return jsonify({'error': 'User not found'}), 404
        
    if not user.check_password(data.get('password')):
        return jsonify({'error': 'Invalid password'}), 401
        
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'access_token': access_token,
        'user_id': user.id,
        'email': user.email
    }), 200


@auth_bp.route('/users', methods=['GET'])
def list_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'role': user.role
    } for user in users])

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    })

