import React from "react";
import { validateUser } from "./validator";

/**
 * Main application component.
 * Displays a simple user form and validates data on submit.
 */
function App() {

  /**
   * Handle form submission.
   * Builds a user object from form fields
   * and calls validateUser from validator.js.
   *
   * @param {Event} event Submit event
   */
  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      birth: new Date(event.target.birth.value),
      postalCode: event.target.postalCode.value
    };

    try {
      validateUser(user);
      alert("Utilisateur valide");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <h1>Formulaire utilisateur</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input id="firstname" name="firstname" type="text" />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input id="lastname" name="lastname" type="text" />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
        </div>

        <div>
          <label htmlFor="birth">Date de naissance</label>
          <input id="birth" name="birth" type="date" />
        </div>

        <div>
          <label htmlFor="city">Ville</label>
          <input id="city" name="city" type="text" />
        </div>

        <div>
          <label htmlFor="postalCode">Code postal</label>
          <input id="postalCode" name="postalCode" type="text" />
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default App;