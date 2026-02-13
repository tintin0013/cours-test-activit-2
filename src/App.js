import React, { useState } from "react";
import {
  validateUser,
  validateEmail,
  validatePostalCode,
  validateIdentity
} from "./validator";
import "./App.css";

/**
 * Main application component.
 * Displays a user form and validates the data on submit.
 *
 * This component manages:
 * - Form submission
 * - Field-level validation on blur
 * - Global validation on submit
 * - Visual feedback
 * - Button disabled state
 * - localStorage persistence
 *
 * @component
 * @returns {JSX.Element}
 */
function App() {

  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  function checkFormValidity(form) {
    const formData = new FormData(form);

    if (
      formData.get("firstname") &&
      formData.get("lastname") &&
      formData.get("email") &&
      formData.get("birth") &&
      formData.get("postalCode")
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  function handleBlur(event) {

    const name = event.target.name;
    const value = event.target.value;

    let newErrors = { ...fieldErrors };

    try {

      if (name === "email") {
        validateEmail(value);
      }

      if (name === "postalCode") {
        validatePostalCode(value);
      }

      if (name === "firstname" || name === "lastname") {
        validateIdentity(value);
      }

      newErrors[name] = null;

    } catch (error) {

      if (error.message === "INVALID_EMAIL") {
        newErrors.email = "Email invalide";
      }

      if (error.message === "INVALID_POSTAL_CODE") {
        newErrors.postalCode = "Code postal invalide";
      }

      if (error.message === "INVALID_IDENTITY") {
        newErrors[name] = "Identité invalide";
      }
    }

    setFieldErrors(newErrors);
  }

  function handleChange(event) {
    const form = event.currentTarget.form;
    checkFormValidity(form);

    if (type === "error") {
      setType(null);
      setMessage(null);
    }
  }

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

      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Utilisateur valide");
      setType("success");

      form.reset();
      setIsFormValid(false);
      setFieldErrors({});

    } catch (error) {

      setMessage(error.message);
      setType("error");
      setIsFormValid(false);

      let newErrors = {};

      if (error.message === "INVALID_EMAIL") {
        newErrors.email = "Email invalide";
      }

      if (error.message === "INVALID_POSTAL_CODE") {
        newErrors.postalCode = "Code postal invalide";
      }

      if (error.message === "INVALID_IDENTITY") {
        newErrors.firstname = "Identité invalide";
      }

      if (error.message === "AGE_UNDER_18") {
        newErrors.birth = "Vous devez avoir au moins 18 ans";
      }

      setFieldErrors(newErrors);
    }
  }

  return (
    <div className="container">
      <h1>Formulaire utilisateur</h1>

      <form onSubmit={handleSubmit} className="form">

        <div className="form-group">
          <label htmlFor="firstname">Prénom</label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {fieldErrors.firstname && (
            <p className="field-error">{fieldErrors.firstname}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Nom</label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {fieldErrors.lastname && (
            <p className="field-error">{fieldErrors.lastname}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {fieldErrors.email && (
            <p className="field-error">{fieldErrors.email}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="birth">Date de naissance</label>
          <input
            id="birth"
            name="birth"
            type="date"
            onChange={handleChange}
          />
          {fieldErrors.birth && (
            <p className="field-error">{fieldErrors.birth}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input
            id="city"
            name="city"
            type="text"
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Code postal</label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {fieldErrors.postalCode && (
            <p className="field-error">{fieldErrors.postalCode}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`submit-button ${
            !isFormValid || type === "error"
              ? "button-disabled"
              : "button-enabled"
          }`}
        >
          Envoyer
        </button>

      </form>

      {message && (
        <div
          role="alert"
          className={`alert ${
            type === "error" ? "alert-error" : "alert-success"
          }`}
          style={{
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