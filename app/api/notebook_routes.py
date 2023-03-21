from flask import Blueprint, jsonify
from app.models import db, Notebook

notebook_routes = Blueprint('notebooks', __name__)
