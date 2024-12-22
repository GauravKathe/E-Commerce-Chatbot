from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User, Product, ChatHistory
from app import db
from app.auth import register_user, check_password

# Create Blueprint
main = Blueprint('main', __name__)

@main.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        print(f"Login attempt for user: {data.get('username')}")  # Debug log
        
        user = User.query.filter_by(username=data['username']).first()
        
        if user and check_password(data['password'], user.password_hash):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'success': True,
                'access_token': access_token,
                'message': 'Login successful'
            })
        
        return jsonify({
            'success': False,
            'message': 'Invalid username or password'
        }), 401
        
    except Exception as e:
        print(f"Login error: {str(e)}")  # Debug log
        return jsonify({
            'success': False,
            'message': 'An error occurred during login'
        }), 500

@main.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    success, message = register_user(
        data['username'],
        data['email'],
        data['password']
    )
    return jsonify({'success': success, 'message': message})

@main.route('/api/chat', methods=['POST'])
@jwt_required()
def chat():
    user_id = get_jwt_identity()
    data = request.get_json()
    user_message = data['message']
    
    # Simple chatbot logic - you can enhance this
    response = process_chat_message(user_message)
    
    # Save chat history
    chat = ChatHistory(
        user_id=user_id,
        message=user_message,
        response=response
    )
    db.session.add(chat)
    db.session.commit()
    
    return jsonify({'response': response})

def process_chat_message(message):
    # Simple response logic - enhance this based on your needs
    message = message.lower()
    if 'product' in message or 'search' in message:
        products = Product.query.limit(5).all()
        return f"Here are some products: {', '.join(p.name for p in products)}"
    return "I'm here to help you shop! You can ask me about products or search for items." 