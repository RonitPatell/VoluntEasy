from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///volunteer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database model
class VolunteerHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), unique=True, nullable=False)
    hours = db.Column(db.Float, default=0)

# Initialize the database
with app.app_context():
    db.create_all()

# Fetch user hours
@app.route('/api/hours/<user_id>', methods=['GET'])
def get_hours(user_id):
    user = VolunteerHours.query.filter_by(user_id=user_id).first()
    if user:
        return jsonify({'hours': user.hours})
    return jsonify({'hours': 0})

# Update user hours
@app.route('/api/hours', methods=['POST'])
def update_hours():
    data = request.json
    user_id = data['user_id']
    new_hours = float(data['hours'])

    user = VolunteerHours.query.filter_by(user_id=user_id).first()
    if user:
        user.hours += new_hours
    else:
        user = VolunteerHours(user_id=user_id, hours=new_hours)
        db.session.add(user)

    db.session.commit()
    return jsonify({'message': 'Hours updated successfully', 'hours': user.hours})

if __name__ == '__main__':
    app.run(debug=True)
