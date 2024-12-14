from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(50),nullable = False)
    email = db.Column(db.String(100),nullable = False)
    password = db.Column(db.String(50),nullable = False)
    movies = db.Column(db.JSON , default = [])

    def to_json(self):
        return {
            'id':self.id,
            'name':self.name,
            'email':self.email,
            'password':self.password,
            'movies':self.movies
        }