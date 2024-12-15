from flask import Blueprint,jsonify,request
from model import top_rated,give_recommendations
from database import Users,db,Movies

main = Blueprint('main',__name__)

@main.route('/users')
def users():
    all_users = Users.query.all()
    all_users = [user.to_json() for user in all_users]

    return all_users

@main.route('/create-user' , methods = ['POST'])
def create_user():
    try:
        data = request.get_json()
        print(data)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        movies = []

        new_user = Users(name = name,email = email,password = password, movies = movies)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'msg':'new user added'}),200
    except Exception as e:
        return jsonify({'error':str(e)}),500

@main.route('/get-user', methods = ['POST'])
def get_user():
    try:
        data = request.get_json() 
        
        required_fields = ['name','password']

        for field in data:
            if not data.get(field):
                return jsonify({'error':f'Missing Required Field {field}'})
            
        name = data.get('name')
        password = data.get('password')

        user = Users.query.filter_by(name = name,password = password).first()
        user_movies = Movies.query.filter_by(user = user.id).all()
        user_movies = [movie.movie for movie in user_movies]

        #Get Recommended Movies
        recommendations = []
        for movie in user_movies:
            recommended = give_recommendations(movie)
            recommendations = recommendations + recommended
            recommendations = list(set(recommendations))
            

        if user:
            return recommendations
        
        return jsonify('user not found')
    except Exception as e:
        return jsonify({'error':str(e)}),500

@main.route('/update-user-movies',methods = ['POST'])
def update_user_movies():
    try:
        data = request.get_json()

        name = data.get('name')
        password = data.get('password')
        movie = data.get('movie')

        logged_in_user = Users.query.filter_by(name = name,password = password).first()
        existing_movie = Movies.query.filter_by(user = logged_in_user.id,movie = movie).first()
        if not existing_movie:
            new_movie = Movies(user = logged_in_user.id,movie = movie)
            db.session.add(new_movie)
            db.session.commit()
        
        
        user_movies = Movies.query.filter_by(user = logged_in_user.id).all()
        user_movies = [movie.movie for movie in user_movies]
        print(user_movies)

        return user_movies
    except Exception as e:
        return jsonify({'error':str(e)}),400


@main.route('/popular-movies')
def popular_movies():
    return top_rated
'''
@main.route('/recommendations')
def recommended_movies():
    user_choice = ['X2: X-Men United', 'Spider-Man', 'Fifth Element, The', 'Spider-Man 2', 'Men in Black (a.k.a. MIB)']
    recommendations = []
    for movie in user_choice:
        recommended = give_recommendations(movie)
        recommendations = recommendations + recommended
        recommendations = list(set(recommendations))

    return recommendations'''
