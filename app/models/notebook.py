from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Notebook(db.Model):
    __tablename__ = 'notebooks'


    if environment == "production":
        __table_args__ = { 'schema': SCHEMA }


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'notes': [note.to_dict() for note in self.notes]

        }
