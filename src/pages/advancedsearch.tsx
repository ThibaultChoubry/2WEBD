import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './advancedsearch.css';

const AdvancedSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [culture, setCulture] = useState('');
  const [period, setPeriod] = useState('');
  const [artistOrCulture, setArtistOrCulture] = useState('');
  const [objectDate, setObjectDate] = useState('');
  const [medium, setMedium] = useState('');
  const [country, setCountry] = useState('');
  const [tags, setTags] = useState('');
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
      const data = await response.json();
      setDepartments(data.departments);
    };

    fetchDepartments();
  }, []);

const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (!query && (departmentId || culture || period || artistOrCulture || objectDate || medium || country || tags)) {
        params.append('query', '');
    }
    if (query) params.append('query', query);
    if (departmentId) params.append('departmentId', departmentId);
    if (culture) params.append('culture', culture);
    if (period) params.append('period', period);
    if (artistOrCulture) params.append('artistOrCulture', artistOrCulture);
    if (objectDate) params.append('objectDate', objectDate);
    if (medium) params.append('medium', medium);
    if (country) params.append('country', country);
    if (tags) params.append('tags', tags);
    navigate(`/search?${params.toString().replace('&', '')}`);
};

  return (
    <div className="advanced-search-page">
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
          <h2>Recherche en détails</h2>
      <main className="main-content">
        <form className="advanced-search-form" onSubmit={handleSearchSubmit}>
          <div className="search-bar">
            <input
              type="text"
              required={true}
              placeholder="Recherche..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Rechercher</button>
          </div>
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="departmentId">Département</label>
              <select
                id="departmentId"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Tous</option>
                {departments.map((dept: any) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.displayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="culture">Culture</label>
              <input
                type="text"
                id="culture"
                value={culture}
                onChange={(e) => setCulture(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="period">Période</label>
              <input
                type="text"
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="artistOrCulture">Artiste ou Culture</label>
              <input
                type="text"
                id="artistOrCulture"
                value={artistOrCulture}
                onChange={(e) => setArtistOrCulture(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="objectDate">Date de l'objet</label>
              <input
                type="text"
                id="objectDate"
                value={objectDate}
                onChange={(e) => setObjectDate(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="medium">Medium</label>
              <input
                type="text"
                id="medium"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="country">Pays</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdvancedSearchPage;
