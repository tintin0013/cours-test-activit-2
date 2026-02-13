import React, { useState } from "react";
import { validateUser } from "./validator";

/**
 * Main application component.
 * Displays a user form and validates the data on submit.
 *
 * This component manages:
 * - Form submission
 * - Validation logic
 * - Visual feedback (success or error message)
 *
 * @component
 * @returns {JSX.Element} Rendered form component
 */
function App() {

  /**
   * State used to display feedback message
   * after form submission.
   *
   * message: string | null
   * type: "success" | "error" | null
   */
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  /**
   * Handle form submission.
   * Extracts form data safely using FormData API,
   * builds a user object and validates it.
   *
   * If validation succeeds:
   * - Display success message in UI
   *
   * If validation fails:
   * - Display error message in UI
   *
   * @param {React.FormEvent<HTMLFormElement>} event Submit event
   */
  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
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

      setMessage("Utilisateur valide");
      setType("success");

    } catch (error) {

      setMessage(error.message);
      setType("error");
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

      {/* Visual feedback section */}
      {message && (
        <div
          role="alert"
          style={{
            marginTop: "20px",
            color: type === "error" ? "red" : "green"
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default App;