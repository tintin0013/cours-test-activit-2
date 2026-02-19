import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';  // <-- on passe par le routeur maintenant
import reportWebVitals from './reportWebVitals';

// Création du root et rendu de l'application avec le routeur
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();