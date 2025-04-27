from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app=Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI']="sqlite:///friends.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

db=SQLAlchemy(app)

import routes

print("In app.py")


with app.app_context():
    db.create_all()

# Define a route for the home page
@app.route("/")
def home():
    return "Hello, Flask!"

# Check if the script is run directly, then start the server
if __name__ == "__main__":
    app.run(debug=True)
