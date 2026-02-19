import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function AppRouter() {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users") || "[]"));

  function addUser(user) {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home users={users} />} />
        <Route path="/register" element={<Register addUser={addUser} />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;