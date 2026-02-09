from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Session
from datetime import datetime, timedelta

study_bp = Blueprint('study', __name__)

@study_bp.route('/study-session', methods=['POST'])
@jwt_required()
def log_study_session():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    session = Session(
        student_id=user_id,
        mentor_id=1,  # Default mentor ID
        scheduled_time=datetime.utcnow(),
        duration=data.get('duration', 60),  # Default to 60 minutes
        status='completed',  # Since we're logging a completed session
        notes=data.get('notes', '')
    )
    
    db.session.add(session)
    db.session.commit()
    
    return jsonify({
        "message": "Study session logged successfully",
        "session_id": session.id
    }), 201

@study_bp.route('/progress', methods=['GET'])
@jwt_required()
def get_study_progress():
    user_id = get_jwt_identity()
    
    # Get last 7 days of study data
    # Get sessions from the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    sessions = Session.query.filter(
        Session.student_id == user_id,
        Session.scheduled_time >= thirty_days_ago
    ).all()
    
    # Calculate total study time
    total_study_time = sum(s.duration for s in sessions)
    
    # Group by week
    weekly_data = {}
    for session in sessions:
        week_start = (session.scheduled_time - timedelta(days=session.scheduled_time.weekday())).date()
        weekly_data[week_start] = weekly_data.get(week_start, 0) + session.duration
    
    return jsonify({
        "total_study_time": total_study_time,
        "weekly_data": [{"week": week.isoformat(), "minutes": minutes} 
                        for week, minutes in weekly_data.items()]
    })