import joblib
import numpy as np
import pandas as pd
import os

print(os.getcwd())
print('Hello World')

base = os.path.dirname(os.path.abspath(__file__))#base path

MODEL = joblib.load(os.path.join(base,'model.pkl'))
MATRIX = joblib.load(os.path.join(base,'user_matrix.pkl'))
POPULAR_MOVIES = joblib.load(os.path.join(base,'user_noticed_movies.pkl'))
#index = np.random.choice(MATRIX.shape[0])

def recommend_for(movie):
    url = f'https://www.omdbapi.com/?apikey=ad4bf0da&t={movie}'
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data
    return {}
       
def give_recommendations(movie):

    index = MATRIX.index.get_loc(movie)
    recommended_movies = []
    sample = MATRIX.iloc[index,:].values.reshape(1,-1)
    distances,indices = MODEL.kneighbors(sample,n_neighbors = 6)
    indices = indices.flatten()[1:]

    for i in indices:
        movie = MATRIX.index[i]
        recommended_movies.append(recommend_for(movie))

    return recommended_movies


top_rated = list(POPULAR_MOVIES['title'][0:10])
