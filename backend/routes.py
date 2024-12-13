from flask import Blueprint
from model import top_rated,predicted_movies

main = Blueprint('main',__name__)

@main.route('/popular-movies')
def predictions():
    return top_rated

@main.route('/predictions')
def popular_movies():
    return predicted_movies
