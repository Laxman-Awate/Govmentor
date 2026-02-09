from datetime import datetime
from backend import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.String(20), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    study_sessions = db.relationship('StudySession', backref='user', lazy=True)
    test_results = db.relationship('TestResult', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.username}>'