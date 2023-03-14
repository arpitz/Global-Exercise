import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StationDetailComponent from "./StationDetailComponent";
import axios from "axios";
jest.mock("axios");

afterEach(cleanup);

test("renders the station details component", () => {
  const loc = {
    brandSlug: "capital",
    slug: "teeside",
    currentPage: 2,
  };
  render(
    <MemoryRouter
      initialEntries={[{ pathname: "/", search: "", state: { loc } }]}>
      <StationDetailComponent />
    </MemoryRouter>
  );
  const heading = screen.getByRole("heading", { name: /station details/i });
  expect(heading).toBeInTheDocument();
});

test("fetches and displays the image and text of the details component", async () => {
  const axiosMock = axios as jest.Mocked<typeof axios>;

  axiosMock.get.mockResolvedValue({
    data: {
      brandId: "KLo",
      brandLogo:
        "https://herald.musicradio.com/media/0d3d891d-32f2-4c53-95ee-8d1e35bdd126.png",
      name: "Capital Teesside",
      streamUrl: "https://media-ssl.musicradio.com/CapitalTeesside",
      tagline: "The UK's No.1 Hit Music Station",
    },
  });

  const loc = {
    brandSlug: "capital",
    slug: "teeside",
    currentPage: 2,
  };

  render(
    <MemoryRouter
      initialEntries={[{ pathname: "/", search: "", state: { loc } }]}>
      <StationDetailComponent />
    </MemoryRouter>
  );

  const stationName = screen.getByRole("cell", { name: /station name:/i });
  expect(stationName).toBeInTheDocument();
});
