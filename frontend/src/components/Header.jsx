import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { FaGithub } from "react-icons/fa";

const Header = ({ onPageChange }) => {
    const [pageId, setPageId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pageId.trim()) {
            onPageChange(pageId.trim());
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="header">
            <h1 onClick={handleLogoClick} className="logo">CodeSync</h1>
            <div className="header-content">
                <div className="header-right">
                    <span className="expiry-notice">Text will be automatically erased in 24 hours</span>
                    <form onSubmit={handleSubmit} className="page-form">
                        <input
                            type="text"
                            value={pageId}
                            onChange={(e) => setPageId(e.target.value)}
                            placeholder="Enter page ID..."
                            className="page-input"
                        />
                        <button type="submit" className="go-button">Go</button>
                    </form>
                    <FaGithub className="github-icon" onClick={() => window.open('https://github.com/jenilsoni01', '_blank')} />   
                </div>
            </div>
        </header>
    );
};

export default Header; 