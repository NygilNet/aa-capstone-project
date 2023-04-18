from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
    dessert = Tag(user_id = 3, tag_name = "Desserts")
    misc = Tag(user_id = 3, tag_name = "Misc.")
    chem = Tag(user_id = 2, tag_name = "Chemistry Notes")
    forensic = Tag(user_id = 2, tag_name = "Forensic Sci Notes")

    db.session.add_all([dessert, misc, chem, forensic])
    db.session.commit()

def undo_tags():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
