import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import useToggle from "../useToggle";

describe("useToggle hook", () => {
  it("toggles the state between true and false", () => {
    function TestComponent() {
      const [state, toggle] = useToggle();

      return (
        <div>
          <button data-testid="button" onClick={toggle}>
            Toggle
          </button>
          <span data-testid="state">{state.toString()}</span>
        </div>
      );
    }

    render(<TestComponent />);

    expect(screen.getByTestId("state").textContent).toBe("false");

    fireEvent.click(screen.getByTestId("button"));
    expect(screen.getByTestId("state").textContent).toBe("true");
    fireEvent.click(screen.getByTestId("button"));
    expect(screen.getByTestId("state").textContent).toBe("false");
  });
});
