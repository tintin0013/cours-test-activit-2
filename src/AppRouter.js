import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import App from "./App"; // Formulaire intact

function AppRouter() {
  // On initialise l'état global des utilisateurs avec le localStorage
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users") || "[]"));

  // Fonction pour ajouter un utilisateur
  function addUser(user) {
    if (!user || !user.firstName || !user.lastName) return; // sécurité
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/register" element={<App addUser={addUser} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;