import axios from 'axios';

// Get the API server URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance for API requests
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fetch a page by pageId from the backend
export const getPage = async (pageId) => {
    try {
        const response = await api.get(`${API_URL}/${pageId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching page:', error);
        throw error;
    }
};

// Update a page's content by pageId on the backend
export const updatePage = async (pageId, content) => {
    try {
        // Ensure content is always a string, even if empty
        const normalizedContent = content ?? '';
        // console.log('Updating page with content:', normalizedContent);
        
        const response = await api.post(`${API_URL}/${pageId}`, { 
            cont: normalizedContent 
        });
        
        // console.log('Page update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
};

export default api; 