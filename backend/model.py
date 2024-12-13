import joblib
import numpy as np
import pandas as pd

print('Hello World')

model = joblib.load('./backend/model.pkl')
matrix = joblib.load('./backend/user_matrix.pkl')
popular_movies = joblib.load('./backend/user_noticed_movies.pkl')
top_rated = list(popular_movies['title'][0:10])
index = np.random.choice(matrix.shape[0])
sample = matrix.iloc[index,:].values.reshape(1,-1)
distances,indices = model.kneighbors(sample,n_neighbors = 6)
indices = indices.flatten()[1:]
predicted_movies = []

for index in indices:
    predicted_movies.append(matrix.index[index])

print(predicted_movies)