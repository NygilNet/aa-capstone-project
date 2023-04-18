from app.models import db, Note, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():

    tags = Tag.query.all()

    recipe1 = Note(
        user_id=3, notebook_id=4, title='Mint Chocolate Brownies',
        content="""<strong>Ingredients:</strong><ul><li>10 ounces dairy free dark chocolate</li><li>1 cup of Earth Balance butter</li><li>4 organic happy free-range eggs</li><li>2 cup packed light brown sugar</li><li>10 oz almond meal</li><li>½ cup sweet white rice flour</li><li>1 teaspoon fine sea salt</li><li>½ teaspoon baking soda</li><li>½ teaspoon xanthan gum</li><li>4 teaspoons vanilla extract</li><li>1 ½ peppermint extract</li><li>1 bar of dairy free mint dark chocolate, chopped</li></ul>""", trash=False
    )
    recipe1.tags.append(tags[0])

    recipe2 = Note(
        user_id=3, notebook_id=4, title="Sweet Potato Pie",
        content="""<strong>Ingredients:</strong><ul><li>⅓ cup butter, softened</li><li>½ cup sugar</li><li>2 Eggland's Best Eggs, lightly beaten</li><li>¾ cup evaporated milk</li><li>2 cups mashed sweet potatoes</li><li>1 teaspoon vanilla extract</li><li>½ teaspoon ground cinnamon</li><li>½ teaspoon ground nutmeg</li><li>¼ teaspoon salt</li><li>1 unbaked pastry shell (9 inches)</li></ul>""", trash=False
    )
    recipe1.tags.append(tags[0])

    food_ideas = Note(
        user_id=3, notebook_id=3, title="Sweet Treats",
        content="""<ul><li>cookies with kettlecorn bites</li><li>sea salt chocolate parfait</li></ul>""", trash=False
    )
    food_ideas.tags.append(tags[0])

    bad_ideas = Note(
        user_id=3, notebook_id=3, title="Really Good Ideas",
        content="""<ul><li>chocolate dipped jalapenos</li><li>pineapple loaded pancakes</li></ul>""", trash=True
    )
    bad_ideas.tags.append(tags[1])

    chem_notes = Note(
        user_id=2, notebook_id=1, title="Learning Objectives",
        content="""<ol><li>Understand chemical reactions</li><li>Balance chemical equations</li></ol>""", trash=False
    )
    chem_notes.tags.append(tags[2])

    forensics_notes = Note(
        user_id=2, notebook_id=2, title="Learning Objectives",
        content="""<ol><li>Understand the history and philosophy of Forensic Science</li><li>Learn the principles of forensic science</li></ol>""", trash=False
    )
    forensics_notes.tags.append(tags[3])

    demo = Note(
        user_id=1, notebook_id=5, title="This is the write notes page",
        content="""<p>Welcome to MindPalace. Write your notes here...</p>""", trash=False
    )

    db.session.add_all([recipe1, recipe2, food_ideas, bad_ideas, chem_notes, forensics_notes, demo])
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
