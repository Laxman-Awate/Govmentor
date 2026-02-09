# backend/init_db.py
from app import create_app, db
from app.models import User, Session
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

def create_test_data():
    app = create_app()
    with app.app_context():
        # Drop and recreate all tables
        db.drop_all()
        db.create_all()
        
        # Create test user
        user = User(
            username='testuser',
            email='test@example.com',
            role='student'
        )
        user.set_password('password')
        db.session.add(user)
        db.session.commit()  # Commit the user first to get an ID
        
        # Now create test sessions with the committed user's ID
        for i in range(3):
            session = Session(
                student_id=user.id,  # Now user.id is available
                mentor_id=1,
                scheduled_time=datetime.utcnow() + timedelta(days=i+1),
                duration=60,
                status='scheduled',
                notes=f'Test session {i+1}'
            )
            db.session.add(session)
        
        db.session.commit()
        print("✅ Test data created successfully!")
        print(f"👤 Test user created with email: test@example.com and password: password")

if __name__ == '__main__':
    print("🚀 Initializing database...")
    create_test_data()