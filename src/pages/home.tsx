import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

interface HighlightArticle {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  objectDate: string;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<HighlightArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11&isHighlight=true');
        const data = await response.json();
        const highlightsData = await Promise.all(
          data.objectIDs.slice(0, 10).map(async (id: number) => {
            const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const objectData = await objectResponse.json();
            return objectData;
          })
        );
        setHighlights(highlightsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles en vedette", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    try {
      const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${e.target.value}`);
      const data = await response.json();
      const objectIDs = data?.objectIDs?.slice(0, 5);
      const suggestions = await Promise.all(
        objectIDs.map(async (id: number) => {
          const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
          const objectData = await objectResponse.json();
          return objectData?.title;
        })
      );
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erreur lors de la récupération des suggestions", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setIsSearchEmpty(true);
    } else {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    setIsSearchEmpty(false);
  };

  const handleAdvancedSearchClick = () => {
    navigate('/advanced-search');
  };

  const handleArticleDetailsClick = (objectId: number) => {
    navigate(`/article-details/${objectId}`);
  };

  return (
    <div className="home-page">
      {isLoading ? (
        <p><img src="/loading.gif" alt="Loading GIF" className="loading-gif" /></p>
      ) : (
        <>
          <header className="header">
            <div className="logo-container">
              <a href="/"><img src="/supmuseum.png" alt="SupMuseum Logo" className="logo" /></a>
            </div>
            <form className="quick-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Recherche rapide..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
                className={isSearchEmpty ? 'empty-search' : ''}
              />
              <button type="submit">
                <img src="/loupe.png" alt="Search Icon" className="search-icon" />
              </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <button className="advanced-search-button" onClick={handleAdvancedSearchClick}>
              <img src="/chapeau.png" alt="Advanced Search Icon" className="chapeau-icon" /> Recherche avancée
            </button>
          </header>
          <h2>Oeuvres en vedette</h2>
          <main className="main-content">
            <div className="highlights">
              {highlights.map((article) => (
                <div key={article.objectID} className="highlight-article">
                  <img src={article.primaryImage} alt={article.title} />
                  <div className="article-info">
                    <h3>{article.title}</h3>
                    <p>{article.artistDisplayName}</p>
                    <p>{article.objectDate}</p>
                    <button className="details-search-button" onClick={() => handleArticleDetailsClick(article.objectID)}>
                      <img src="/details.png" alt="Details Search Icon" className="details-icon" /> Détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Home;
