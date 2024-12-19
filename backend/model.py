import joblib
import numpy as np
import pandas as pd
import os
import requests
import random

print(os.getcwd())
print('Hello World')

base = os.path.dirname(os.path.abspath(__file__))#base path

MODEL = joblib.load(os.path.join(base,'model.pkl'))
MATRIX = joblib.load(os.path.join(base,'user_matrix.pkl'))
POPULAR_MOVIES = joblib.load(os.path.join(base,'user_noticed_movies.pkl'))

def get_details_for(movie):
    url = f'https://www.omdbapi.com/?apikey=ad4bf0da&t={movie}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if 'Actors' and 'Poster' and 'Title' and 'Plot' and 'Year' in data:
            return data
        return {}
    return {}
       
def give_recommendations(movie):
    #Some movie names in the dataset is incomplete so we are using this try except block
    try:
        index = MATRIX.index.get_loc(movie)
        recommended_movies = []
        sample = MATRIX.iloc[index,:].values.reshape(1,-1)
        distances,indices = MODEL.kneighbors(sample,n_neighbors = 6)
        indices = indices.flatten()[1:]
        
        for i in indices:
            movie = MATRIX.index[i]
            recommended_movies.append(movie)
            
        return recommended_movies
    except:
        return []

POPULAR_MOVIES = list(POPULAR_MOVIES['title'])
popular = random.sample(POPULAR_MOVIES,20)
print(popular)
top_rated = []


for movie in popular:
    response = get_details_for(movie)
    if response != {}:
        top_rated.append(response)
    if len(top_rated) == 15:
        break

