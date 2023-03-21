from flask import Blueprint, jsonify
from app.models import db, Notebook

notebook_routes = Blueprint('notebooks', __name__)

@notebook_routes.get('')
def notebooks():
    """
    Test route to query for all the notebooks in the db. NOT for production use.
    """
    print('DELETE THIS AT SOME POINT CONSOLE.LOG')
    notebooks = Notebook.query.all()
    return { 'notebooks': [notebook.to_dict() for notebook in notebooks] }
