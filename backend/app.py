from flask import Flask
from routes import main
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World"

app.register_blueprint(main)

if __name__ == '__main__':
    app.run()