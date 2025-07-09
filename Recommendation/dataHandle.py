import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
#import seaborn as sns

def load_data():
    """Loads the books, ratings, and users datasets."""
    #drive.mount('/content/drive')
    books_df = pd.read_csv(r'D:\ShiftedFiles\BookRecommendations\archive\Books.csv')
    rating_df = pd.read_csv(r'D:\ShiftedFiles\BookRecommendations\archive\Ratings.csv')
    user_df = pd.read_csv(r'D:\ShiftedFiles\BookRecommendations\archive\Users.csv')
    return books_df, rating_df, user_df


def preprocess_data(rating_df, user_df):
   
    count1 = rating_df['User-ID'].value_counts()
    rating_df = rating_df[rating_df['User-ID'].isin(count1[count1 >= 200].index)]
    count2=rating_df['Book-Rating'].value_counts()
    rating_df=rating_df[rating_df['Book-Rating'].isin(count2[count2 >= 100].index)]

    maxtrix_df = rating_df.pivot_table(index='User-ID', columns='ISBN', values='Book-Rating').fillna(0)
    return maxtrix_df

