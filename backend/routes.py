from flask import Blueprint,jsonify,request
from model import top_rated,give_recommendations,get_details_for,popular
from database import Users,db,Movies
import random 

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

        for field in data:
            if not data.get(field):
                return jsonify({'error':f'Missing Required Field {field}'})
            
        name = data.get('name')
        password = data.get('password')

        user = Users.query.filter_by(name = name,password = password).first()

        if user:
            user_movies = Movies.query.filter_by(user = user.id).all()
            user_movies = [movie.movie for movie in user_movies]
            user_movies = [get_details_for(movie) for movie in user_movies][::-1]

            return user_movies[:10] #returns the latest movies selected by he user
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
        user_movies = [movie.movie for movie in user_movies][::-1]#To get the latest added movies to the dataset
        #user_movies = user_movies[:5]
        
        #Get Recommended Movies
        recommendations = []
        for movie in user_movies:
            recommended = give_recommendations(movie)
            recommended = [movie for movie in recommended if movie != {}]
            recommendations = recommendations + recommended

        recommendations = list(set(recommendations))
        recommendations = random.sample(recommendations,20)
        print(recommendations)
        recommended_movie_details = []

        for movie in recommendations:
            details = get_details_for(movie)
            if details != {}:
                recommended_movie_details.append(details)
            if len(recommended_movie_details) == 10:
                break

        return recommended_movie_details
    
    except Exception as e:
        return jsonify({'error':str(e)}),400


@main.route('/popular-movies')
def popular_movies():
    return top_rated
