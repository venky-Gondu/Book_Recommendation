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

### Backend:

* Python 3.x
* FastAPI
* `uvicorn`
* `pandas`, `numpy`
* `scikit-learn`
* \[Optional: `SQLAlchemy`, etc.]

### Frontend:

* React.js
* `npm` or `yarn`
* `axios`
* \[Optional: `react-router-dom`, `material-ui`, etc.]

### Data:

* Book Recommendation Dataset (`Books.csv`, `Ratings.csv`, `Users.csv`)

### Deployment:

* Docker
* \[Optional: Docker Compose]

### Development & Version Control:

* Git & GitHub
* VS Code, Jupyter Notebooks

## Project Structure

```
Book_recommendationsystem/
├── book-recommendations-frontend/     # React.js application for the user interface
├── book-recommendations-backend/      # FastAPI backend with recommendation logic and API
│   ├── Correlation.py                 # Correlation-based recommendation logic
│   ├── dataHandle.py                  # Data loading, cleaning, preprocessing
│   ├── KNN.py                         # KNN-based recommendation logic
│   └── main.py                        # FastAPI application entry point
├── archive/                           # Contains raw datasets and supplementary files
│   ├── Books.csv
│   ├── Ratings.csv
│   └── Users.csv
├── .github/                           # GitHub Actions workflows (if any)
├── .gitignore                         # Specifies intentionally untracked files
├── Dockerfile                         # Docker configuration
├── requirements.txt                   # Python dependencies for the backend
└── README.md                          # Project documentation
```

## Getting Started

### Prerequisites

* Git
* Docker Desktop (or Docker Engine)
* (Optional for local development)

  * Python 3.x
  * Node.js & npm (or Yarn)

### Installation & Running with Docker (Recommended)

1. Clone the repository:

```bash
git clone https://github.com/your-username/Book_recommendationsystem.git
cd Book_recommendationsystem
```

2. Build and run Docker containers:

#### Option A: Single Dockerfile (combined build)

```bash
docker build -t book-recs-app .
docker run -p 8000:8000 -p 3000:3000 book-recs-app
```

#### Option B: Docker Compose (if available)

```bash
docker-compose up --build
```

#### Option C: Separate Backend/Frontend Images

```bash
# Backend
cd book-recommendations-backend
docker build -t book-recs-backend .
docker run -p 8000:8000 book-recs-backend

# Frontend (separately)
cd ../book-recommendations-frontend
npm install
npm start
```

### Running Without Docker (Locally)

1. Clone the repository:

```bash
git clone https://github.com/your-username/Book_recommendationsystem.git
cd Book_recommendationsystem
```

2. Backend setup:

```bash
cd book-recommendations-backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

3. Frontend setup:

```bash
cd ../book-recommendations-frontend
npm install
npm start
```

## Usage

* Navigate to `http://localhost:3000` to access the application.
* Browse available books.
* Click on a book to view recommendations based on it.

## API Endpoints (FastAPI)

* `GET /`: Root endpoint.
* `GET /books`: List all books.
* `GET /books/{book_id}/recommendations`: Get recommended books for a given book.

  * Example: `http://localhost:8000/books/0439064872/recommendations`
* \[Add more endpoints here if applicable]

## Data Description

* **Books.csv**: Book metadata (ISBN, title, author, etc.)
* **Users.csv**: User demographic information
* **Ratings.csv**: User ratings for books

## Algorithms / Models Used

* **Correlation-based Recommendation**: Pearson correlation on user ratings
* **K-Nearest Neighbors (KNN)**: Item-item similarity for recommendations
* \[Optional: Add Matrix Factorization, NLP-based content matching, etc.]

## Future Enhancements

* Add user authentication
* Store data in a proper database (e.g., PostgreSQL, MongoDB)
* Use more advanced ML/DL models
* Add real-time updates
* CI/CD pipelines and testing
* Better logging and error handling

---

Feel free to contribute or raise an issue if you find a bug or have a suggestion!
