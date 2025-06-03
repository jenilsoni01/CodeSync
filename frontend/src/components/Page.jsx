import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
import Header from './Header';
import '../styles/Page.css';

const Page = () => {
    const { pageId } = useParams();
    const navigate = useNavigate();

    const handlePageChange = (newPageId) => {
        navigate(`/${newPageId}`);
    };

    return (
        <div className="page">
            <Header onPageChange={handlePageChange} />
            <CodeEditor pageId={pageId} />
        </div>
    );
};

export default Page; 