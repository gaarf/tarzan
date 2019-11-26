import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

it("renders layout without crashing", () => {
  const { queryByTestId } = render(<App />);
  expect(queryByTestId("main")).toBeTruthy();
});
