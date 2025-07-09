import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const sampleBooks = [
    {
        ISBN: "0061009059",
        BookName: "One for the Money (Stephanie Plum Novels (Pape...)",
        Author: "Janet Evanovich",
        Year: "1995",
        Publisher: "HarperTorch",
    },
    {
        ISBN: "0316776963",
        BookName: "Me Talk Pretty One Day",
        Author: "David Sedaris",
        Year: "2001",
        Publisher: "Back Bay Books",
    },
    {
        ISBN: "0679731148",
        BookName: "A Year in Provence",
        Author: "Peter Mayle",
        Year: "1991",
        Publisher: "Vintage Books USA",
    },
    {
        ISBN: "0385486804",
        BookName: "Into the Wild",
        Author: "Jon Krakauer",
        Year: "1997",
        Publisher: "Anchor",
    },
];

function App() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const fetchRecommendations = async (isbn, book) => {
        setError("");
        setResults([]);
        setLoading(true);
        setSelectedBook(book);
        try {
            const response = await axios.get(`http://localhost:8000/${isbn}`);
            if (Array.isArray(response.data)) {
                setResults(response.data);
            } else if (response.data.data) {
                setError(response.data.data);
            } else {
                setError("No recommendations found.");
            }
        } catch (err) {
            setError("Error fetching recommendations.");
        }
        setLoading(false);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#181c24",
                color: "#f5f6fa",
                padding: "40px 0",
            }}
        >
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    fontFamily: "sans-serif",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: 40,
                        fontSize: 44,
                        letterSpacing: 1,
                        fontWeight: 800,
                    }}
                >
                    Book Recommendations
                </h2>
                <div
                    style={{
                        display: "flex",
                        gap: 32,
                        overflowX: "auto",
                        justifyContent: "flex-start",
                        marginBottom: 50,
                        paddingBottom: 10,
                    }}
                >
                    {sampleBooks.map((book, idx) => (
                        <div
                            key={book.ISBN}
                            onClick={() => fetchRecommendations(book.ISBN, book)}
                            style={{
                                background: "#23283a",
                                borderRadius: 18,
                                padding: 32,
                                minWidth: 320,
                                cursor: "pointer",
                                boxShadow: "0 2px 12px #0005",
                                border:
                                    selectedBook && selectedBook.ISBN === book.ISBN
                                        ? "3px solid #00b894"
                                        : "3px solid transparent",
                                transition: "border 0.2s",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 26,
                                    marginBottom: 12,
                                }}
                            >
                                {book.BookName}
                            </div>
                            <div
                                style={{
                                    fontSize: 20,
                                    marginBottom: 8,
                                }}
                            >
                                Author:{" "}
                                <span style={{ fontWeight: 500 }}>{book.Author}</span>
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    marginBottom: 6,
                                }}
                            >
                                Year:{" "}
                                <span style={{ fontWeight: 500 }}>{book.Year}</span>
                            </div>
                            <div style={{ fontSize: 18 }}>
                                Publisher:{" "}
                                <span style={{ fontWeight: 500 }}>{book.Publisher}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && (
                    <div
                        style={{
                            textAlign: "center",
                            color: "#00b894",
                            fontSize: 22,
                        }}
                    >
                        Loading recommendations...
                    </div>
                )}
                {error && (
                    <div
                        style={{
                            color: "#e17055",
                            marginBottom: 20,
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        {error}
                    </div>
                )}
                {selectedBook && (
                    <h3
                        style={{
                            textAlign: "center",
                            margin: "30px 0 24px",
                            fontSize: 30,
                            fontWeight: 700,
                        }}
                    >
                        Recommendations for:{" "}
                        <span style={{ color: "#00b894" }}>
                            {selectedBook.BookName}
                        </span>
                    </h3>
                )}
                {results.length > 0 && (
                    <div
                        style={{
                            display: "flex",
                            gap: 32,
                            overflowX: "auto",
                            justifyContent: "flex-start",
                            paddingBottom: 10,
                        }}
                    >
                        {results.map((rec, idx) => (
                            <div
                                key={rec.ISBN || idx}
                                style={{
                                    background: "#23283a",
                                    borderRadius: 18,
                                    padding: 32,
                                    minWidth: 320,
                                    boxShadow: "0 2px 12px #0005",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 24,
                                        marginBottom: 12,
                                    }}
                                >
                                    {rec.BookName || rec.book_name || rec["Book-Title"] || "Unknown Title"}
                                </div>
                                <div
                                    style={{
                                        fontSize: 19,
                                        marginBottom: 8,
                                    }}
                                >
                                    Author:{" "}
                                    <span style={{ fontWeight: 500 }}>
                                        {rec.Author || rec.author || rec["Book-Author"] || "Unknown Author"}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        fontSize: 17,
                                        marginBottom: 6,
                                    }}
                                >
                                    Year:{" "}
                                    <span style={{ fontWeight: 500 }}>
                                        {rec.Year || rec.year_of_publication || rec["Year-Of-Publication"] || "Unknown Year"}
                                    </span>
                                </div>
                                <div style={{ fontSize: 17 }}>
                                    Publisher:{" "}
                                    <span style={{ fontWeight: 500 }}>
                                        {rec.Publisher || rec.publisher || "Unknown Publisher"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
