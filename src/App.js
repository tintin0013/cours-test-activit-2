import React, { useState } from "react";
import { validateUser } from "./validator";

/**
 * Main application component.
 * Displays a user form and validates the data on submit.
 *
 * This component manages:
 * - Form submission
 * - Basic form validation state
 * - Visual feedback (success or error message)
 *
 * @component
 * @returns {JSX.Element} Rendered form component
 */
function App() {

  /**
   * Feedback message state.
   * message: string | null
   * type: "success" | "error" | null
   */
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  /**
   * Simple state to track if form is valid
   * (all required fields filled).
   *
   * @type {boolean}
   */
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * Checks if all required fields contain a value.
   * This is a simple UI-level validation (not business validation).
   *
   * @param {HTMLFormElement} form
   */
  function checkFormValidity(form) {
    const formData = new FormData(form);

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const birth = formData.get("birth");
    const postalCode = formData.get("postalCode");

    if (
      firstname &&
      lastname &&
      email &&
      birth &&
      postalCode
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  /**
   * Handle input changes.
   * Re-checks form validity whenever user types.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   */
  function handleChange(event) {
    const form = event.currentTarget.form;
    checkFormValidity(form);
  }

  /**
   * Handle form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
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
          <input
            id="firstname"
            name="firstname"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="birth">Date de naissance</label>
          <input
            id="birth"
            name="birth"
            type="date"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="city">Ville</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="postalCode">Code postal</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={!isFormValid}>
          Envoyer
        </button>
      </form>

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