# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# CORS(app)

# # Configure SQLite database
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///volunteer.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# # Database model
# class VolunteerHours(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.String(255), unique=True, nullable=False)
#     hours = db.Column(db.Float, default=0)

# # Initialize the database
# with app.app_context():
#     db.create_all()

# # Fetch user hours
# @app.route('/api/hours/<user_id>', methods=['GET'])
# def get_hours(user_id):
#     user = VolunteerHours.query.filter_by(user_id=user_id).first()
#     if user:
#         return jsonify({'hours': user.hours})
#     return jsonify({'hours': 0})

# # Update user hours
# @app.route('/api/hours', methods=['POST'])
# def update_hours():
#     data = request.json
#     user_id = data['user_id']
#     new_hours = float(data['hours'])

#     user = VolunteerHours.query.filter_by(user_id=user_id).first()
#     if user:
#         user.hours += new_hours
#     else:
#         user = VolunteerHours(user_id=user_id, hours=new_hours)
#         db.session.add(user)

#     db.session.commit()
#     return jsonify({'message': 'Hours updated successfully', 'hours': user.hours})

# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///volunteer.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Database Models
class VolunteerHours(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), unique=True, nullable=False)
    hours = db.Column(db.Float, default=0)

class VolunteerEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    hours = db.Column(db.Float, nullable=False)

# Initialize the database
with app.app_context():
    db.create_all()

# Endpoint: Fetch total hours for a user
@app.route('/api/hours/<user_id>', methods=['GET'])
def get_hours(user_id):
    user = VolunteerHours.query.filter_by(user_id=user_id).first()
    if user:
        return jsonify({'hours': user.hours})
    return jsonify({'hours': 0})

# Endpoint: Fetch all entries for a user
@app.route('/api/entries/<user_id>', methods=['GET'])
def get_entries(user_id):
    entries = VolunteerEntry.query.filter_by(user_id=user_id).all()
    return jsonify({
        "entries": [
            {"id": e.id, "position": e.position, "location": e.location, "hours": e.hours}
            for e in entries
        ]
    })

# Endpoint: Add a new volunteering entry
@app.route('/api/entries', methods=['POST'])
def add_entry():
    data = request.json
    user_id = data['user_id']
    position = data['position']
    location = data['location']
    hours = float(data['hours'])

    # Add new entry to VolunteerEntry table
    new_entry = VolunteerEntry(user_id=user_id, position=position, location=location, hours=hours)
    db.session.add(new_entry)

    # Update or create total hours in VolunteerHours table
    user = VolunteerHours.query.filter_by(user_id=user_id).first()
    if user:
        user.hours += hours
    else:
        user = VolunteerHours(user_id=user_id, hours=hours)
        db.session.add(user)

    db.session.commit()

    return jsonify({"message": "Entry added successfully", "hours": user.hours}), 200

# Endpoint: Delete a volunteering entry
@app.route('/api/entries/<int:entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    entry = VolunteerEntry.query.get(entry_id)
    if not entry:
        return jsonify({"message": "Entry not found"}), 404

    user_id = entry.user_id
    hours_to_deduct = entry.hours

    # Delete the entry
    db.session.delete(entry)

    # Update total hours in VolunteerHours table
    user = VolunteerHours.query.filter_by(user_id=user_id).first()
    if user:
        user.hours -= hours_to_deduct
        if user.hours < 0:
            user.hours = 0
        db.session.commit()

    return jsonify({"message": "Entry deleted successfully", "hours": user.hours}), 200

@app.route('/api/reset/<user_id>', methods=['POST'])
def reset_user_data(user_id):
    try:
        # Delete all entries for the user
        VolunteerEntry.query.filter_by(user_id=user_id).delete()

        # Reset user hours
        user = VolunteerHours.query.filter_by(user_id=user_id).first()
        if user:
            user.hours = 0

        db.session.commit()
        return jsonify({'message': 'User data reset successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)


