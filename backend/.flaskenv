FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=1

# Database configuration
DATABASE_URL=sqlite:///govmentor.db

# JWT Configuration
JWT_SECRET_KEY=your-secret-key-change-this-in-production
JWT_ACCESS_TOKEN_EXPIRES=3600  # 1 hour in seconds
