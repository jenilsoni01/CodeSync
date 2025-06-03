import { useState, useEffect, useCallback, useRef } from 'react';
import { getPage, updatePage } from '../services/api';
import socketService from '../services/socket';
import '../styles/CodeEditor.css';

const CodeEditor = ({ pageId }) => {
    const [code, setCode] = useState('');
    const [lineNumbers, setLineNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const updateTimeoutRef = useRef(null);
    const lastEmittedCodeRef = useRef('');
    const isLocalUpdateRef = useRef(false);

    // Update line numbers whenever code changes
    useEffect(() => {
        const lines = code.split('\n');
        setLineNumbers(Array.from({ length: lines.length }, (_, i) => i + 1));
    }, [code]);

    // Load page content and setup socket connection
    useEffect(() => {
        if (!pageId) return;

        const loadPage = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getPage(pageId);
                const initialContent = data.content ?? '';
                setCode(initialContent);
                lastEmittedCodeRef.current = initialContent;

                // Setup socket connection
                socketService.connect(pageId);
                socketService.on('codeUpdate', handleCodeUpdate);
            } catch (err) {
                setError('Failed to load page');
                console.error('Error loading page:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPage();

        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current);
            }
            socketService.disconnect();
        };
    }, [pageId]);

    // Handle incoming code updates from other clients
    const handleCodeUpdate = useCallback((data) => {
        // console.log('Handling code update:', data);
        const newContent = data.content;

        // Only update if the content is different and it's not a local update
        if (newContent === '') {
            console.log('Received empty content');
            setCode('');
            lastEmittedCodeRef.current = newContent;
        } else if (code !== newContent && !isLocalUpdateRef.current) {
            console.log('Updating code from remote')//:', newContent);
            setCode(newContent);
            lastEmittedCodeRef.current = newContent;
        }
    }, [code]);

    // Debounced function to emit updates
    const debouncedEmitUpdate = useCallback((newCode) => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(async () => {
            try {
                // Normalize the content to handle blank content properly
                const normalizedContent = newCode ?? '';

                // Only emit if the code has actually changed
                if (normalizedContent !== lastEmittedCodeRef.current) {
                    console.log('Emitting update with content:', normalizedContent);
                    isLocalUpdateRef.current = true;

                    // Emit the update to other clients
                    socketService.emit('codeUpdate', { content: normalizedContent });

                    // Update the database
                    await updatePage(pageId, normalizedContent);

                    lastEmittedCodeRef.current = normalizedContent;

                    // Reset the local update flag after a short delay
                    setTimeout(() => {
                        isLocalUpdateRef.current = false;
                    }, 100);
                }
            } catch (err) {
                console.error('Error updating code:', err);
            }
        }, 300); // 300ms debounce delay
    }, [pageId]);

    // Handle code changes in the textarea
    const handleCodeChange = (e) => {
        const newCode = e.target.value || '';
        setCode(newCode);
        debouncedEmitUpdate(newCode);
    };

    // if (isLoading) {
    //     return <div className="loading">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error">{error}</div>;
    // }

    return (
        <div className="code-editor-container">
            <div className="line-numbers">
                {lineNumbers.map((num) => (
                    <div key={num} className="line-number">
                        {num}
                    </div>
                ))}
            </div>

            <textarea
                className="code-input"
                value={code}
                onChange={handleCodeChange}
                spellCheck="false"
                placeholder="Type your code here..."
            />
        </div>
    );
};

export default CodeEditor; 