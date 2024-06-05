import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './searchpage.css';

interface SearchResult {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  objectDate: string;
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage: React.FC = () => {
  const query = useQuery();
  const searchQuery = query.get('query') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchQuery}`);
        const data = await response.json();
        const resultsData = await Promise.all(
          (data.objectIDs || []).slice(0, 10).map(async (id: number) => {
            const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const objectData = await objectResponse.json();
            return objectData;
          })
        );
        setResults(resultsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats de recherche", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
      setIsSearchEmpty(false);
    } else {
      setIsLoading(false);
      setIsSearchEmpty(true);
    }
  }, [searchQuery]);

  const handleArticleDetailsClick = (objectId: number) => {
    navigate(`/article-details/${objectId}`);
  };

  return (
    <div className="search-page">
      {isLoading ? (
        <p><img src="/loading.gif" alt="Loading GIF" className="loading-gif" /></p>
      ) : (
        <>
          <header className="header">
            <div className="logo-container">
              <a href="/"><img src="/supmuseum.png" alt="SupMuseum Logo" className="logo" /></a>
            </div>
            <a href="/">
            <button className="advanced-search-button">
                <img src="/home.png" alt="Advanced Search Icon" className="chapeau-icon" /> Retour à l'accueil
              </button>
            </a>
          </header>
          <h2>Résultats de la recherche pour "{searchQuery}"</h2>
          <main className="main-content">
            {isSearchEmpty ? (
              <p className="error">Veuillez entrer une recherche.</p>
            ) : (
              <div className="results">
                {results.length > 0 ? (
                  results.map(result => (
                    <div key={result.objectID} className="search-result">
                      <img src={result.primaryImage || '/placeholder.jpg'} alt={result.title} />
                      <div className="result-info">
                        <h3>{result.title}</h3>
                        <p>{result.artistDisplayName}</p>
                        <p>{result.objectDate}</p>
                        <button className="details-search-button" onClick={() => handleArticleDetailsClick(result.objectID)}> 
                          <img src="/details.png" alt="Details Search Icon" className="details-icon" />Détails
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aucun résultat trouvé.</p>
                )}
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default SearchPage;
