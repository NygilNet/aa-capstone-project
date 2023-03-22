from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Notebook

notebook_routes = Blueprint('notebooks', __name__)


# CREATE A NEW NOTEBOOK
@notebook_routes.post('')
@login_required
def post_new_notebook():
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
    notebooks = Notebook.query.filter_by(user_id = current_user.id)
    return { notebook.id: notebook.to_dict() for notebook in notebooks }


    # GET SINGLE NOTEBOOK
@notebook_routes.get('/<int:id>')
@login_required
def get_single_notebook(id):
    notebook = Notebook.query.get(id)
    if not notebook.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }, 401)
    return notebook.to_dict()


# UPDATE NOTEBOOK
@notebook_routes.put('/<int:id>')
@login_required
def edit_notebook(id):
    json_data = request.json
    notebook = Notebook.query.get(id)
    if not notebook.user_id == current_user.id:
        return jsonify({
            "message": "Unauthorized"
        }, 401)
    notebook.name = json_data.get('name')
    db.session.commit()
    return notebook.to_dict()


# DELETE NOTEBOOK
@notebook_routes.delete('/<int:id>')
@login_required
def delete_notebook(id):
    pass
