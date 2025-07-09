from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd
def get_knn_recommendations(maxtrix_df, book_isbn, n_neighbors=11):
    
    if book_isbn not in maxtrix_df.columns:
        print(f"Book with ISBN {book_isbn} not found in the matrix.")
        return []

    # Get the data for the book of interest
    book_data = maxtrix_df[book_isbn].values.reshape(1, -1)

    # Check if the book_data contains only zeros or NaNs
    if np.sum(book_data) == 0 or np.isnan(book_data).all():
         print(f"Book with ISBN {book_isbn} has no valid ratings in the filtered data for KNN.")
         return []

    # Initialize and fit the KNN model
    # We use 'brute' algorithm and 'cosine' metric for similarity
    knn = NearestNeighbors(n_neighbors=n_neighbors, algorithm='brute', metric='cosine')
    knn.fit(maxtrix_df.T) # Fit on the transposed matrix to find similar items (books)
    distances, indices = knn.kneighbors(book_data)

    return indices.flatten().tolist()


def get_book_details_by_index(books_df, maxtrix_df, indices):
    
    recommended_isbns = [maxtrix_df.columns[i] for i in indices]


    recommended_books_info = books_df[books_df['ISBN'].isin(recommended_isbns)]

    return recommended_books_info