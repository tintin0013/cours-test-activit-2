import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

/**
 * @file App.integration.test.js
 * @description
 * Integration tests for the User form.
 *
 * These tests simulate real user interaction
 * and verify the integration between:
 * App.js → validator.js → module.js
 *
 * Covered scenarios:
 * - Rendering of all form fields
 * - Successful submission
 * - Under 18 error
 * - Invalid email format
 * - Invalid postal code
 */

describe("Integration test - User form", () => {

  /**
   * Test rendering of all required inputs
   * and the submit button.
   */
  test("should render the form fields and submit button", () => {
    render(<App />);

    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Nom$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postal/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  /**
   * Valid form submission should display success message.
   */
  test("should submit valid form and show success alert", () => {

    window.alert = jest.fn();

    render(<App />);

    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: "Jean" }
    });

    fireEvent.change(screen.getByLabelText(/^Nom$/i), {
      target: { value: "Dupont" }
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jean@test.com" }
    });

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2000-01-01" }
    });

    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: "75000" }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(window.alert).toHaveBeenCalledWith("Utilisateur valide");
  });

  /**
   * Under 18 user should trigger AGE_UNDER_18 error.
   */
  test("should show error if user is under 18", () => {

    window.alert = jest.fn();

    render(<App />);

    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: "Tom" }
    });

    fireEvent.change(screen.getByLabelText(/^Nom$/i), {
      target: { value: "Junior" }
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "tom@test.com" }
    });

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "2015-01-01" }
    });

    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: "75000" }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(window.alert).toHaveBeenCalledWith("AGE_UNDER_18");
  });

  /**
   * Invalid email format should trigger INVALID_EMAIL error.
   */
  test("should show error if email format is invalid", () => {

    window.alert = jest.fn();

    render(<App />);

    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: "Marie" }
    });

    fireEvent.change(screen.getByLabelText(/^Nom$/i), {
      target: { value: "Martin" }
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "marie-test.com" }
    });

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "1995-05-10" }
    });

    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: "75000" }
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(window.alert).toHaveBeenCalledWith("INVALID_EMAIL");
  });

  /**
   * Invalid postal code should trigger INVALID_POSTAL_CODE error.
   */
  test("should show error if postal code format is invalid", () => {

    window.alert = jest.fn();

    render(<App />);

    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: "Paul" }
    });

    fireEvent.change(screen.getByLabelText(/^Nom$/i), {
      target: { value: "Durand" }
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "paul@test.com" }
    });

    fireEvent.change(screen.getByLabelText(/date/i), {
      target: { value: "1990-10-10" }
    });

    fireEvent.change(screen.getByLabelText(/code postal/i), {
      target: { value: "75A00" } // invalid postal code
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(window.alert).toHaveBeenCalledWith("INVALID_POSTAL_CODE");
  });

});