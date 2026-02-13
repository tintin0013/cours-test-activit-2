import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

/**
 * Integration tests for the User form.
 *
 * These tests verify:
 * - Rendering of all form fields
 * - Successful submission with valid data
 * - Error handling for business rules (age, email format)
 *
 * The goal is to simulate real user interaction
 * and validate integration between:
 * App.js → validator.js → module.js
 */
describe("Integration test - User form", () => {

  /**
   * Ensure that all required fields
   * and the submit button are rendered.
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
   * Valid form submission should call alert
   * with success message.
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
   * If the user is under 18,
   * validator should throw AGE_UNDER_18
   * and alert should display the error message.
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

    // Recent date → under 18
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
   * If email format is invalid,
   * validator should throw INVALID_EMAIL
   * and alert should display the error message.
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
      target: { value: "marie-test.com" } // invalid email
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

});