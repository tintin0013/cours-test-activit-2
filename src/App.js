import React from "react";
import { validateUser } from "./validator";

/**
 * Main application component.
 * Displays a user form and validates the data on submit.
 *
 * @component
 * @returns {JSX.Element} Rendered form component
 */
function App() {

  /**
   * Handle form submission.
   * Extracts form data safely using FormData API,
   * builds a user object and validates it.
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submit event
   */
  function handleSubmit(event) {
    event.preventDefault();

    // On récupère toujours le form correctement
    const form = event.currentTarget;

    // Utilisation de FormData (plus robuste en test)
    const formData = new FormData(form);

    const user = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      birth: new Date(formData.get("birth")),
      postalCode: formData.get("postalCode")
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