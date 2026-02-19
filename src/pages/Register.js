import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateUser,
  validateEmail,
  validatePostalCode,
  validateIdentity
} from "../validator";

function Register({ addUser }) {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  function checkFormValidity(form) {
    const formData = new FormData(form);
    const firstname = formData.get("firstname")?.trim();
    const lastname = formData.get("lastname")?.trim();
    const email = formData.get("email")?.trim();
    const birth = formData.get("birth")?.trim();
    const postalCode = formData.get("postalCode")?.trim();
    const city = formData.get("city")?.trim();

    setIsFormValid(firstname && lastname && email && birth && postalCode && city);
  }

  function handleBlur(event) {
    const name = event.target.name;
    const value = event.target.value;
    let newErrors = { ...fieldErrors };

    try {
      if (name === "email") validateEmail(value);
      if (name === "postalCode") validatePostalCode(value);
      if (name === "firstname" || name === "lastname") validateIdentity(value);
      newErrors[name] = null;
    } catch (error) {
      if (error.message === "INVALID_EMAIL") newErrors.email = "Email invalide";
      if (error.message === "INVALID_POSTAL_CODE") newErrors.postalCode = "Code postal invalide";
      if (error.message === "INVALID_IDENTITY") newErrors[name] = "Identité invalide";
    }

    setFieldErrors(newErrors);
  }

  function handleChange(event) {
    checkFormValidity(event.currentTarget.form);
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
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      email: formData.get("email"),
      birth: new Date(formData.get("birth")),
      postalCode: formData.get("postalCode"),
      city: formData.get("city")
    };

    try {
      validateUser(user);
      addUser(user);

      setMessage("Utilisateur valide");
      setType("success");

      form.reset();
      setIsFormValid(false);
      setFieldErrors({});

      navigate("/"); // Retour à l'accueil

    } catch (error) {
      setType("error");
      setIsFormValid(false);

      let newErrors = {};
      if (error.message === "INVALID_EMAIL") newErrors.email = "Email invalide";
      if (error.message === "INVALID_POSTAL_CODE") newErrors.postalCode = "Code postal invalide";
      if (error.message === "INVALID_IDENTITY") newErrors.firstname = "Identité invalide";
      if (error.message === "AGE_UNDER_18") newErrors.birth = "Vous devez avoir au moins 18 ans";

      setFieldErrors(newErrors);
      setMessage(
        error.message === "INVALID_EMAIL" ? "Email invalide" :
        error.message === "INVALID_POSTAL_CODE" ? "Code postal invalide" :
        error.message === "INVALID_IDENTITY" ? "Identité invalide" :
        error.message === "AGE_UNDER_18" ? "Vous devez avoir au moins 18 ans" :
        error.message
      );
    }
  }

  return (
    <div className="container">
      <h1>Formulaire utilisateur</h1>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="firstname">Prénom</label>
          <input id="firstname" name="firstname" type="text" onChange={handleChange} onBlur={handleBlur} />
          {fieldErrors.firstname && <p className="field-error">{fieldErrors.firstname}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Nom</label>
          <input id="lastname" name="lastname" type="text" onChange={handleChange} onBlur={handleBlur} />
          {fieldErrors.lastname && <p className="field-error">{fieldErrors.lastname}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" onChange={handleChange} onBlur={handleBlur} />
          {fieldErrors.email && <p className="field-error">{fieldErrors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="birth">Date de naissance</label>
          <input id="birth" name="birth" type="date" onChange={handleChange} />
          {fieldErrors.birth && <p className="field-error">{fieldErrors.birth}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input id="city" name="city" type="text" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Code postal</label>
          <input id="postalCode" name="postalCode" type="text" onChange={handleChange} onBlur={handleBlur} />
          {fieldErrors.postalCode && <p className="field-error">{fieldErrors.postalCode}</p>}
        </div>

        <button type="submit" disabled={!isFormValid} className={`submit-button ${!isFormValid || type === "error" ? "button-disabled" : "button-enabled"}`}>
          Envoyer
        </button>
      </form>

      {message && <div role="alert" className={`alert ${type === "error" ? "alert-error" : "alert-success"}`} style={{ color: type === "error" ? "red" : "green" }}>{message}</div>}
    </div>
  );
}

export default Register;