import React from "react";
import { Link } from "react-router-dom";

function Home({ users }) {
  return (
    <div className="container">
      <h1>Accueil</h1>

      <div>
        {users.length} utilisateur{users.length > 1 ? "s" : ""} inscrit{users.length > 1 ? "s" : ""}
      </div>

      <ul>
        {users
          .filter(u => u && u.firstName && u.lastName) // éviter les objets vides
          .map((u, idx) => (
            <li key={idx}>
              {u.firstName} {u.lastName}
            </li>
          ))}
      </ul>

      <Link to="/register">Aller au formulaire</Link>
    </div>
  );
}

export default Home;