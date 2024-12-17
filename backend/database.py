from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(50),nullable = False)
    email = db.Column(db.String(100),nullable = False)
    password = db.Column(db.String(50),nullable = False)
    movies = db.relationship('Movies',backref = 'users',passive_deletes = True)#in backref the database name should be given in small letters
    

    def to_json(self):
        return {
            'id':self.id,
            'name':self.name,
            'email':self.email,
            'password':self.password,
        }
    
class Movies(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    user = db.Column(db.Integer,db.ForeignKey('users.id',ondelete = 'CASCADE'),nullable=False)
    movie = db.Column(db.String(50),nullable = False)