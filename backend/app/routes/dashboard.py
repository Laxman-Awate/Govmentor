from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Session
from datetime import datetime, timedelta

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_dashboard():
    user_id = get_jwt_identity()
    
    # Get user's upcoming sessions
    upcoming_sessions = Session.query.filter(
        Session.student_id == user_id,
        Session.scheduled_time >= datetime.utcnow()
    ).order_by(Session.scheduled_time).limit(3).all()
    
    # Get recent sessions
    recent_sessions = Session.query.filter(
        Session.student_id == user_id,
        Session.scheduled_time < datetime.utcnow()
    ).order_by(Session.scheduled_time.desc()).limit(3).all()
    
    # Format the response
    return jsonify({
        "upcoming_sessions": [{
            "id": s.id,
            "scheduled_time": s.scheduled_time.isoformat(),
            "duration": s.duration,
            "status": s.status,
            "notes": s.notes
        } for s in upcoming_sessions],
        "recent_sessions": [{
            "id": s.id,
            "scheduled_time": s.scheduled_time.isoformat(),
            "duration": s.duration,
            "status": s.status,
            "notes": s.notes
        } for s in recent_sessions],
        "today_goals": [
            {"text": "Complete 2 mock tests", "completed": True},
            {"text": "Review GS Paper I notes", "completed": False},
            {"text": "Practice 30 MCQs", "completed": False}
        ],
        "quick_actions": [
            {"icon": "book", "label": "Start Test", "primary": True},
            {"icon": "book-open", "label": "Study Materials"},
            {"icon": "users", "label": "Find Mentor"},
            {"icon": "clock", "label": "Study Timer"}
        ]
    })

@dashboard_bp.route('/tests', methods=['GET'])
@jwt_required()
def get_tests():
    # For now, return an empty list since we don't have a Test model yet
    return jsonify([])