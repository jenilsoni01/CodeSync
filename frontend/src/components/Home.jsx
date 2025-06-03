import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    // State to hold the page ID input by the user
    const [pageId, setPageId] = useState('');
    const navigate = useNavigate();// Hook to programmatically navigate

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (pageId.trim()) {
            navigate(`/${pageId.trim()}`);
        }
    };

    return (
        <div className="home">
            <div className="home-content">
                <h1>CodeShare</h1>
                <p>Share and collaborate on code in real-time</p>
                <form onSubmit={handleSubmit} className="search-form">
                    <input
                        type="text"
                        value={pageId}
                        onChange={(e) => setPageId(e.target.value)}
                        placeholder="Enter page ID to start..."
                        className="search-input"
                    />
                    <button type="submit" className="search-button">Go</button>
                </form>
            </div>

            <div className="home-footer">
                <p>Text will be automatically erased in 24 hours</p>
                <p>Created by <a href="https://github.com/jenilsoni01" target="_blank" rel="noopener noreferrer">Jenil Soni</a></p>
            </div>
        </div>
    );
};

export default Home; 