import pandas as pd
import numpy as np

def calculate_correlation(maxtrix_df, new_rating, book_isbn):
   
    if book_isbn not in maxtrix_df.columns:
        print(f"Book with ISBN {book_isbn} not found in the matrix.")
        return pd.DataFrame(columns=['Correlation', 'Book_rating_count'])

    book_ratings = maxtrix_df[book_isbn]

    # Check if the book_ratings series contains only zeros or NaNs
    if book_ratings.sum() == 0 or book_ratings.isnull().all():
        print(f"Book with ISBN {book_isbn} has no valid ratings in the filtered data.")
        return pd.DataFrame(columns=['Correlation', 'Book_rating_count'])

    # Filter out books with zero standard deviation before calculating correlation
    valid_columns = maxtrix_df.columns[maxtrix_df.std() != 0]
    similar_to_book = maxtrix_df[valid_columns].corrwith(book_ratings)

    corr_book = pd.DataFrame(similar_to_book, columns=['Correlation'])
    corr_book.dropna(inplace=True)

    corr_book = corr_book.join(new_rating['Book_rating_count'])
    return corr_book

def recommend_books(corr_book, books_df, min_rating_count=100, top_n=10):
   
    recommended_isbns = corr_book[corr_book['Book_rating_count'] > min_rating_count].sort_values('Correlation', ascending=False).head(top_n).index
    top_n_books_info = books_df[books_df['ISBN'].isin(recommended_isbns)]
    return top_n_books_info