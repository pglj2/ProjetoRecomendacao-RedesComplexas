from flask import Flask, request
from sklearn.externals import joblib
from flask import render_template
import pandas as pd
import numpy as np
from flask import jsonify
import sys

app = Flask(__name__)
item_similarity = None
item_similarity = pd.read_csv("static/item_similarity.csv", index_col=0)
final_DF = pd.read_csv("static/final_dataset.csv", index_col=0)

@app.route("/")
def root():
    return render_template("index.html")


def predict(ratings, similarity, type='user'):
    if type == 'user':
        mean_user_rating = ratings.mean(axis=1)
        #You use np.newaxis so that mean_user_rating has same format as ratings
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / np.array([np.abs(similarity).sum(axis=1)])
    return pred



@app.route('/classify')
def classify():
    venue_id = request.args.get('venue_id', 0, type=int)
    user_id = request.args.get('user_id', 0, type=int)
    user_ratings = final_DF.loc[[user_id]].as_matrix()
    item_prediction = predict(user_ratings, item_similarity, type='item')
    place_index = np.argmax(item_prediction)
    venue_recommended = final_DF.columns[place_index-1]
    return jsonify(result=venue_recommended)

if __name__ == "__main__":
    app.run()