import joblib
import numpy as np
import pandas as pd
import os
import requests

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
        return data
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

popular = list(POPULAR_MOVIES['title'])[:20]
top_rated = []

for movie in popular:
    response = get_details_for(movie)
    if 'Actors' and 'Poster' and 'Title' and 'Plot' and 'Year' in response:
        top_rated.append(response)
    if len(top_rated) == 15:
        break

#top_rated = [get_details_for(movie) for movie in top_rated]

