import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the app", () => {
    const { getByText } = render(<App />);
    const headerText = screen.getByText(/Todo App/i);
    expect(headerText).toBeInTheDocument();
  });
});
