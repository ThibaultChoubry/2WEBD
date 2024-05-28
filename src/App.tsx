import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import SearchPage from './pages/searchpage';
import AdvancedSearchPage from './pages/advancedsearch';
import AdvancedSearchResultsPage from './pages/advancedsearchresult';
import ArticleDetailsPage from './pages/articledetails'; // Import ArticleDetails
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/advanced-search" element={<AdvancedSearchPage />} />
                    <Route path="/advanced-search-results" element={<AdvancedSearchResultsPage />} />
                    <Route path="/article-details/:objectId" element={<ArticleDetailsPage />} /> {/* Update this line */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
