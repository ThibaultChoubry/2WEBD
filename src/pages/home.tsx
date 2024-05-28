import React, { useState, useEffect } from 'react';
import './home.css'; // Assurez-vous de créer un fichier CSS pour le style

interface HighlightArticle {
  objectID: number;
  title: string;
  primaryImage: string;
  artistDisplayName: string;
  objectDate: string;
}

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [highlights, setHighlights] = useState<HighlightArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les articles en vedette
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logique de recherche rapide
    console.log('Rechercher:', searchQuery);
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>SupKnowledge Collections</h1>
        <form className="quick-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Recherche rapide..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Rechercher</button>
        </form>
      </header>
      <main className="main-content">
        <h2>Articles en vedette</h2>
        {isLoading ? (
          <p>Chargement...</p>
        ) : (
          <div className="highlights">
            {highlights.map(article => (
              <div key={article.objectID} className="highlight-article">
                <img src={article.primaryImage} alt={article.title} />
                <div className="article-info">
                  <h3>{article.title}</h3>
                  <p>{article.artistDisplayName}</p>
                  <p>{article.objectDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
