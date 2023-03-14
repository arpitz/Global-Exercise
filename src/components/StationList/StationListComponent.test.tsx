import React from "react";
import { render, screen } from "@testing-library/react";
import StationListComponent from "./StationListComponent";
import { BrowserRouter } from "react-router-dom";

test("renders the station list component", () => {
  render(
    <BrowserRouter>
      <StationListComponent />
    </BrowserRouter>
  );
  const heading = screen.getByRole("heading", { name: /station list/i });
  expect(heading).toBeInTheDocument();
});

test("renders list of stations", async () => {
  render(
    <BrowserRouter>
      <StationListComponent />
    </BrowserRouter>
  );
  const items = await screen.findAllByRole("link");
  // 10 for the stations list and 1 for the Add New Station Link
  expect(items.length).toBe(11);
});
