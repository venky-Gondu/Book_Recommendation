# Book Recommendation System

## Overview

This project implements a **Book Recommendation System** designed to suggest relevant books to users. The core functionality revolves around providing recommendations for books that are similar to a book a user has actively shown interest in (e.g., "clicked"). It leverages a comprehensive Book Recommendation dataset and applies various machine learning techniques for robust recommendations. The system is built with a powerful **FastAPI** backend for efficient API communication and a dynamic **React.js** frontend for an interactive user experience, all containerized with **Docker** for seamless deployment.

## Features

* **Content-Based Filtering:** Recommends books similar to a user's chosen book based on attributes (e.g., genre, author, description).
* **Collaborative Filtering (Implicit/Item-Item):** Identifies books frequently liked or interacted with by users who also liked a specific book.
* **Data Preprocessing:** Robust handling and cleaning of the Book Recommendation dataset.
* **High-Performance Backend:** Built with FastAPI, offering asynchronous capabilities and automatic API documentation (Swagger UI/ReDoc).
* **Interactive Frontend:** A modern single-page application (SPA) developed with React.js for a smooth user experience.
* **Containerization with Docker:** Ensures consistent development and deployment environments across different platforms.
* **Scalability:** Designed with modular components for potential future enhancements and integration.

## Technologies Used

* **Backend:**
    * Python 3.x
    * **FastAPI** (Web framework)
    * `uvicorn` (ASGI server for FastAPI)
    * `pandas`, `numpy` (Data manipulation)
    * `scikit-learn` (Machine learning algorithms - e.g., for KNN, correlation)
    * [Specify any other Python libraries you heavily use, e.g., `SQLAlchemy` if using a DB]
* **Frontend:**
    * **React.js** (JavaScript library for building user interfaces)
    * `npm` or `yarn` (Package manager)
    * `axios` (HTTP client for API calls)
    * [Specify any related libraries, e.g., `react-router-dom`, `material-ui` for styling]
* **Data:**
    * Book Recommendation Dataset (CSV files: `Books.csv`, `Ratings.csv`, `Users.csv`)
* **Deployment:**
    * **Docker** (Containerization)
    * [Any other tools, e.g., `Docker Compose` if you use it for multi-container setup]
* **Development & Version Control:**
    * Git & GitHub
    * VS Code, Jupyter Notebooks (for experimentation)

## Project Structure

The repository is organized into the following main directories:
.
├── book-recommendations-frontend/   # React.js application for the user interface
├── book-recommendations-backend/    # FastAPI backend with recommendation logic and API
├── archive/                         # Contains raw datasets and supplementary files (e.g., images of analysis)
├── .github/                         # GitHub Actions workflows (if any)
├── .gitignore                       # Specifies intentionally untracked files
├── Dockerfile                       # Docker configuration for containerization (for backend or full app)
├── requirements.txt                 # Python dependencies for the backend
├── README.md                        # This file
└── ...

* **`book-recommendations-frontend/`**: Houses the user-facing web application built with React.js.
* **`book-recommendations-backend/`**: Contains the FastAPI application, core logic for data loading, preprocessing, model training, and serving recommendations via RESTful API endpoints.
    * `Correlation.py`: Logic for correlation-based recommendation.
    * `dataHandle.py`: Responsible for data loading, cleaning, and initial processing.
    * `KNN.py`: Implements K-Nearest Neighbors for recommendation.
    * `main.py`: The main FastAPI application entry point.
* **`archive/`**: Stores the original Book Recommendation dataset (`Books.csv`, `Ratings.csv`, `Users.csv`) and potentially other related assets or analysis results.
* **`Dockerfile`**: Defines the environment and steps to build a Docker image for your application (likely for the backend, or a multi-stage build for both).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Git
* **Docker Desktop** (or Docker Engine)
* (Optional, for native development outside Docker)
    * Python 3.x
    * Node.js & npm (or Yarn)

### Installation & Running with Docker (Recommended)

This is the easiest way to get the entire application running.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/Book_recommendationsystem.git](https://github.com/your-username/Book_recommendationsystem.git)
    cd Book_recommendationsystem
    ```

2.  **Build and Run Docker Containers:**
    * **Option A: Single Dockerfile for both (if your Dockerfile handles both backend and frontend builds)**
        ```bash
        docker build -t book-recs-app .
        docker run -p 8000:8000 -p 3000:3000 book-recs-app
        # Adjust ports if your Dockerfile exposes different ones.
        # Typically FastAPI runs on 8000, React dev server on 3000.
        ```
    * **Option B: Using Docker Compose (if you have a `docker-compose.yml` for separate services):**
        ```bash
        docker-compose up --build
        ```
        *(If you don't have a `docker-compose.yml` yet, it's highly recommended for multi-service apps like this. I can help you draft one if needed.)*

    * **Option C: Building Backend & Frontend Images Separately (less common for a single `Dockerfile` at root)**
        If your `Dockerfile` at the root is for the backend, you'll need to build and run the frontend separately or use a multi-stage Dockerfile that compiles the React app into the backend image or serves it. Let's assume your root `Dockerfile` is for the FastAPI backend for now.
        ```bash
        # From project root:
        docker build -t book-recs-backend -f Dockerfile .
        # (Assuming your Dockerfile builds the backend)
        docker run -p 8000:8000 book-recs-backend
        ```
        Then, run frontend as described below.

### Installation & Running Natively (Without Docker)

If you prefer to run the components directly on your machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/Book_recommendationsystem.git](https://github.com/your-username/Book_recommendationsystem.git)
    cd Book_recommendationsystem
    ```

2.  **Backend Setup (`book-recommendations-backend/`):**
    ```bash
    cd book-recommendations-backend
    pip install -r requirements.txt
    ```

3.  **Frontend Setup (`book-recommendations-frontend/`):**
    ```bash
    cd ../book-recommendations-frontend # Go back to root, then into frontend
    npm install # or yarn install
    ```

### Running the Application Natively

1.  **Start the Backend Server (from `book-recommendations-backend/` directory):**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The FastAPI backend API should now be running at `http://localhost:8000`. You can access its interactive documentation at `http://localhost:8000/docs` (Swagger UI) or `http://localhost:8000/redoc`.

2.  **Start the Frontend Development Server (from `book-recommendations-frontend/` directory):**
    ```bash
    npm start # or yarn start
    ```
    This will usually open the application in your browser at `http://localhost:3000`.

## Usage

* Once both the frontend and backend are running (either natively or via Docker), navigate to `http://localhost:3000` in your web browser (or the appropriate frontend URL if you've changed it).
* Browse through the available books.
* Click on a specific book to view its details and trigger the recommendation engine to suggest similar books.

## API Endpoints (FastAPI)

The backend exposes the following key API endpoints:

* **`/`**: Root endpoint (often returns a simple welcome message).
* **`/books` (GET)**: Retrieve a list of all books.
* **`/books/{book_id}/recommendations` (GET)**: Get recommendations for a specific book.
    * Example: `http://localhost:8000/books/0439064872/recommendations` (replace with actual ISBN/book_id)
* [List any other relevant endpoints you have, e.g., `/users`, `/ratings`, `/search?query=...`]

You can explore the full API documentation at `http://localhost:8000/docs` when the backend server is running.

## Data

The project utilizes a Book Recommendation dataset, typically comprising:
* `Books.csv`: Contains book details (ISBN, title, author, publication year, publisher, image URLs).
* `Users.csv`: Contains user data (User-ID, location, age).
* `Ratings.csv`: Contains user ratings for books (User-ID, ISBN, Book-Rating).

These files are located in the `archive/` directory.

## Algorithms / Models Used

* **Correlation-based Recommendation:** Uses Pearson correlation to find books similar to the clicked book based on user rating patterns.
* **K-Nearest Neighbors (KNN):** Employs KNN for item-item similarity, identifying the 'k' most similar books based on features or rating vectors.
* [Add any other algorithms or models you might use, e.g., Matrix Factorization, Content-based techniques based on text features.]

## Future Enhancements

* Implement user authentication and personalized profiles.
* Integrate more advanced recommendation algorithms (e.g., Matrix Factorization, Deep Learning models).
* Add real-time recommendation updates.
* Expand dataset with more features (e.g., genres, tags).
* **Implement a database (e.g., PostgreSQL, MongoDB) for persistent storage instead of CSVs.**
* Implement comprehensive error handling and logging.
* Automated testing for both frontend and backend.
* Continuous Integration/Continuous Deployment (CI/CD) pipelines.





---