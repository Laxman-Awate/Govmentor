# backend/app/routes/api.py
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, Session, db
from datetime import datetime

api_bp = Blueprint('api', __name__)

@api_bp.route('/mentors', methods=['GET'])
@jwt_required()
def get_mentors():
    mentors = User.query.filter_by(role='mentor').all()
    return jsonify([mentor.to_dict() for mentor in mentors])

@api_bp.route('/sessions', methods=['GET', 'POST'])
@jwt_required()
def manage_sessions():
    user_id = get_jwt_identity()
    
    if request.method == 'GET':
        # Get user's sessions
        sessions = Session.query.filter(
            (Session.student_id == user_id) | (Session.mentor_id == user_id)
        ).all()
        
        return jsonify([{
            'id': s.id,
            'scheduled_time': s.scheduled_time.isoformat(),
            'duration': s.duration,
            'status': s.status,
            'student': s.student.to_dict() if s.student else None,
            'mentor': s.mentor.to_dict() if s.mentor else None
        } for s in sessions])
    
    elif request.method == 'POST':
        # Book a new session
        data = request.get_json()
        
        if not all(k in data for k in ['mentor_id', 'scheduled_time', 'duration']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        try:
            scheduled_time = datetime.fromisoformat(data['scheduled_time'].replace('Z', '+00:00'))
        except (ValueError, AttributeError):
            return jsonify({'error': 'Invalid date format'}), 400
        
        session = Session(
            student_id=user_id,
            mentor_id=data['mentor_id'],
            scheduled_time=scheduled_time,
            duration=data['duration'],
            notes=data.get('notes', '')
        )
        
        db.session.add(session)
        db.session.commit()
        
        return jsonify({
            'message': 'Session booked successfully',
            'session': {
                'id': session.id,
                'scheduled_time': session.scheduled_time.isoformat(),
                'duration': session.duration,
                'status': session.status
            }
        }), 201