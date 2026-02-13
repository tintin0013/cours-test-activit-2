import React from "react";

function App() {
  return (
    <div>
      <h1>Formulaire utilisateur</h1>

      <form>
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input id="firstname" type="text" />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input id="lastname" type="text" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>

        <div>
          <label htmlFor="birth">Date de naissance</label>
          <input id="birth" type="date" />
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;