import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './articledetails.css';

interface ArtObjectDetails {
  objectID: number;
  primaryImage: string;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  department: string;
  country: string;
  medium: string;
  tags: string[];
}

const ArticleDetailsPage: React.FC = () => {
  const { objectId } = useParams<{ objectId: string }>();
  const [articleDetails, setArticleDetails] = useState<ArtObjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        const data = await response.json();
        setArticleDetails({
          objectID: data.objectID,
          primaryImage: data.primaryImage,
          title: data.title,
          artistDisplayName: data.artistDisplayName,
          objectDate: data.objectDate,
          department: data.department,
          country: data.country,
          medium: data.medium,
          tags: data.tags,
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'article", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleDetails();
  }, [objectId]);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (!articleDetails) {
    return <p>Article non trouvé</p>;
  }

  return (
    <div className="article-details-page">
      <header className="header">
        <h1>Détails de l'article</h1>
      </header>
      <main className="main-content">
        <div className="article-details">
          <img src={articleDetails.primaryImage} alt={articleDetails.title} />
          <div className="details">
            <h2>{articleDetails.title}</h2>
            <p><strong>Artiste : </strong>{articleDetails.artistDisplayName}</p>
            <p><strong>Date de l'objet : </strong>{articleDetails.objectDate}</p>
            <p><strong>Département : </strong>{articleDetails.department}</p>
            <p><strong>Pays : </strong>{articleDetails.country}</p>
            <p><strong>Medium : </strong>{articleDetails.medium}</p>
            <p><strong>Tags : </strong>{articleDetails.tags.join(', ')}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailsPage;
