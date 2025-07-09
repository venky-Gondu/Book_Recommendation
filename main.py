import numpy as np
import pandas as pd
import sklearn as skl
from fastapi import FastAPI      
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


from Recommendation.Correlation import calculate_correlation, recommend_books
from Recommendation.KNN import get_book_details_by_index, get_knn_recommendations
from Recommendation.dataHandle import load_data, preprocess_data

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/{ISBN}')
def Recommend(ISBN:str):
    # Main execution
    books_df, rating_df, user_df = load_data()
    maxtrix_df = preprocess_data(rating_df, user_df)

    # Calculate book rating counts for filtering *after* preprocessing
    new_rating = pd.DataFrame(rating_df.groupby('ISBN')['Book-Rating'].mean())
    book_rating_counts = rating_df.groupby('ISBN')['Book-Rating'].count().sort_values(ascending=False)
    new_rating['Book_rating_count'] = book_rating_counts


    book_to_recommend_for = ISBN  # Replace with the ISBN of the book you are interested in
    correlation_results = calculate_correlation(maxtrix_df, new_rating, book_to_recommend_for)
    Knn_result=get_knn_recommendations(maxtrix_df,ISBN)
    recommendations_dict = []
    knn_dict = []
    reco_df = None

    if not correlation_results.empty:
        recommendations = recommend_books(correlation_results, books_df)
        recommendations_dict = recommendations.to_dict(orient='records')
        
    if Knn_result is not None:
        reco_df = get_book_details_by_index(books_df, maxtrix_df, Knn_result)
        knn_dict = reco_df.to_dict(orient='records')

    if recommendations_dict and knn_dict:

        res=recommendations_dict+knn_dict
        # Remove duplicates based on ISBN if present
      
        return res
    elif recommendations_dict:
        return recommendations_dict
    elif knn_dict:
        return knn_dict
    else:
        return {'data': f"we don't have Recommendations for Book:{ISBN}"}


