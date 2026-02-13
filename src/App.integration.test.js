import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

/**
 * @file App.integration.test.js
 *
 * Integration tests for the User form.
 *
 * These tests simulate real user interaction and verify:
 * - Rendering of the form
 * - Validation logic integration
 * - Visual feedback in the DOM (role="alert")
 *
 * We test the full chain:
 * App.js → validator.js → module.js
 *
 * The goal is to validate real user behaviour,
 * not internal implementation details.
 */

describe("Integration test - User form", () => {

  /**
   * The form should render all required inputs
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
   * A valid submission should:
   * - Display a success message
   * - Render it inside an element with role="alert"
   */
  test("should submit valid form and show success message", () => {

    render(<App />);

    // Before submit, no alert should be visible
    expect(screen.queryByRole("alert")).toBeNull();

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

    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent("Utilisateur valide");
  });

  /**
   * If user is under 18:
   * - AGE_UNDER_18 should be displayed visually
   */
  test("should show error if user is under 18", () => {

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

    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("AGE_UNDER_18");
  });

  /**
   * If email format is invalid:
   * - INVALID_EMAIL should be displayed
   */
  test("should show error if email format is invalid", () => {

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

    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("INVALID_EMAIL");
  });

  /**
   * If postal code format is invalid:
   * - INVALID_POSTAL_CODE should be displayed
   */
  test("should show error if postal code format is invalid", () => {

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
      target: { value: "75A00" }
    });

    fireEvent.submit(screen.getByRole("button"));

    const alert = screen.getByRole("alert");

    expect(alert).toHaveTextContent("INVALID_POSTAL_CODE");
  });

});