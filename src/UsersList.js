import React, { useState, useEffect } from "react";

/**
 * Composant pour afficher la liste des utilisateurs inscrits.
 *
 * Récupère les utilisateurs depuis le localStorage et affiche leur nom et email.
 *
 * @component
 * @returns {JSX.Element}
 */
function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupérer les utilisateurs depuis le localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  return (
    <div className="users-list">
      <h2>Utilisateurs inscrits</h2>
      {users.length === 0 ? (
        <p>Aucun utilisateur inscrit</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UsersList;