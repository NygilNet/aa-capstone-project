from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Note

note_routes = Blueprint('notes', __name__)


# CREATE A NEW note
@note_routes.post('')
@login_required
def post_new_note():
    json_data = request.json_data
    note = Note(
        user_id= current_user.id, notebook_id= json_data.get('notebook_id'), title= json_data.get('title'), content= json_data.get('content'), trash= False
        )
    db.session.add(note)
    db.session.commit()
    return note.to_dict()

# READ SINGLE note
@note_routes.get('/<int:id>')
@login_required
def get_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({
            "message": "Note not found"
        }), 404
    if not note.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    return note.to_dict()


# UPDATE note
    # UPDATE TITLE OR CONTENT
@note_routes.put('/<int:id>')
@login_required
def edit_note(id):
    json_data = request.json
    note = Note.query.get(id)
    if not note:
        return jsonify({
            "message": "Note not found"
        }), 404
    if not note.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    if json_data.get('title'):
        note.title = json_data.get('title')
    if json_data.get('content'):
        note.content = json_data.get('content')
    db.session.commit()
    return note.to_dict()


    # MOVE IN OR OUT OF TRASH
@note_routes.put('/<int:id>/delete')
@login_required
def trash_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({
            "message": "Note not found"
        }), 404
    if not note.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    note.trash = not note.trash
    db.session.commit()
    return note.to_dict()


# DELETE note
@note_routes.delete('/<int:id>')
@login_required
def delete_note(id):
    note = Note.query.get(id)
    if not note:
        return jsonify({
            "message": "Note not found"
        }), 404
    if not note.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    db.session.delete(note)
    db.session.commit()
    return jsonify({
        "message": "Successfully deleted"
    }), 200
