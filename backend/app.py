from flask import Flask
from flask_cors import CORS
from routes import main
from database import db


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def home():
    return "Hello World"

app.register_blueprint(main)

with app.app_context():
    db.create_all()
    #db.drop_all()
    
if __name__ == '__main__':
    app.run()