import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Integration test - User form", () => {

  test("should render the form fields and submit button", () => {
    render(<App />);

    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ville/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/code postal/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

});