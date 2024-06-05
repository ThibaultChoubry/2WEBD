import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './advancedsearchresult.css';

interface ArtObject {
  objectID: number;
  primaryImageSmall: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
}

const AdvancedSearchResultsPage: React.FC = () => {
  const [results, setResults] = useState<ArtObject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      const query = new URLSearchParams(location.search);
      const apiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?${query.toString()}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const objectIDs = data.objectIDs || [];
        const objectsData = await Promise.all(
          objectIDs.slice(0, 20).map(async (id: number) => {
            const objectResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
            const objectData = await objectResponse.json();
            return objectData;
          })
        );
        setResults(objectsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats de recherche", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div className="search-results-page">
      {isLoading ? (
        <p><img src="/loading.gif" alt="Loading GIF" className="loading-gif" /></p>
      ) : (
        <>
          <header className="header">
            <h1>Résultats de la recherche</h1>
          </header>
          <main className="main-content">
            <div className="results-list">
              {results.length === 0 ? (
                <p>Aucun résultat trouvé</p>
              ) : (
                results.map(result => (
                  <div key={result.objectID} className="result-item">
                    <img
                      src={result.primaryImageSmall || '/placeholder.jpg'} 
                      alt={result.title}
                    />
                    <div className="result-info">
                      <h3>{result.title}</h3>
                      <p>{result.artistDisplayName}</p>
                      <p>{result.objectDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default AdvancedSearchResultsPage;
