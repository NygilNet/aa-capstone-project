from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Tag

tag_routes = Blueprint('tags', __name__)

# CREATE A NEW TAG
@tag_routes.post('')
@login_required
def post_new_tag():
    """
    Input:
    Output:
    Purpose:
    """
    json_data = request.json

    exists = Tag.query.filter(user_id = current_user.id, tag_name = json_data.get('tag_name')).first()

    if not exists:
        tag = Tag(
            user_id = current_user.id, tag_name = json_data.get('tag_name')
        )
        db.session.add(note)
        db.session.commit()
        return tag.to_dict()
    else:
        return jsonify({
            "message": "Tag already exists"
        }), 409


# READ USER'S TAGS
@tag_routes.get('')
@login_required
def get_tags():
    """
    Input:
    Output:
    Purpose:
    """
    tags = Tag.query.filter(user_id = current_user.id)
    return [tag.to_dict() for tag in tags]


# DELETE TAG
@tag_routes.delete('/<int:id>')
@login_required
def delete_rag(id):
    """
    Input:
    Output:
    Purpose:
    """
    tag = Tag.query.get(id)
    if not tag:
        return jsonify({
            "message": "Tag not found"
        }), 404
    if not tag.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    db.session.delete(tag)
    db.session.commit()
    return jsonify({
        "message": "Successfully deleted"
    }), 200
