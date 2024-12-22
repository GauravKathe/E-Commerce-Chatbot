from app import create_app, db
from app.models import User
from app.auth import hash_password

app = create_app()

# Create a test user when the application starts
with app.app_context():
    # Check if test user already exists
    if not User.query.filter_by(username='testuser').first():
        test_user = User(
            username='testuser',
            email='testuser@example.com',
            password_hash=hash_password('password123')
        )
        db.session.add(test_user)
        db.session.commit()
        print("Test user created successfully!")

if __name__ == '__main__':
    app.run(debug=True) 