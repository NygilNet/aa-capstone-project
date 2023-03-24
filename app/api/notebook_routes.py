from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook

notebook_routes = Blueprint('notebooks', __name__)


# CREATE A NEW NOTEBOOK
@notebook_routes.post('')
@login_required
def post_new_notebook():
    """
    Input: An API fetch with a JSON body containing a name key
    Output: A dictionary of the newly created db entry
    Purpose: add a entry to the database
    """
    json_data = request.json
    notebook = Notebook(user_id = current_user.id, name = json_data.get('name'))
    db.session.add(notebook)
    db.session.commit()
    return notebook.to_dict()


# READ NOTEBOOKS
    # GET ALL NOTEBOOKS
@notebook_routes.get('')
@login_required
def get_all_notebooks():
    """
    Input: An API fetch, no body
    Output: Normalized dictionary of notebooks belonging to current user
    Purpose: Get a list of notebooks with exposing another user's notebooks
    """
    notebooks = Notebook.query.filter_by(user_id = current_user.id)
    return { notebook.id: notebook.to_dict() for notebook in notebooks }


    # GET SINGLE NOTEBOOK
@notebook_routes.get('/<int:id>')
@login_required
def get_single_notebook(id):
    """
    Input: An API fetch, id of notebook
    Output: A dictionary of the notebook found in the db
    Purpose: Get a single instance of the db entry of specific details
    """
    notebook = Notebook.query.get(id)
    if not notebook:
        return jsonify({
            "message": "Notebook not found"
        }), 404
    if not notebook.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    return notebook.to_dict()


# UPDATE NOTEBOOK
@notebook_routes.put('/<int:id>')
@login_required
def edit_notebook(id):
    """
    Input: API fetch, id needs to be passed in
    Output: An updated dictionary of the db entry
    Purpose: updates a notebook's name in the db
    """
    json_data = request.json
    notebook = Notebook.query.get(id)
    if not notebook:
        return jsonify({
            "message": "Notebook not found"
        }), 404
    if not notebook.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    notebook.name = json_data.get('name')
    db.session.commit()
    return notebook.to_dict()


# DELETE NOTEBOOK
@notebook_routes.delete('/<int:id>')
@login_required
def delete_notebook(id):
    """
    Input: An API fetch, the id of the notebook being deleted
    Output: a success or failure message
    Purpose: remove an entry from the db
    """
    notebook = Notebook.query.get(id)
    if not notebook:
        return jsonify({
            "message": "Notebook not found"
        }), 404
    if not notebook.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }), 401
    db.session.delete(notebook)
    db.session.commit()
    return jsonify({
        'message': 'Successfully deleted'
    }), 200
