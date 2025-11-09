import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import FundraisingPage from "../components/FundraisingPage";
import fundraisingEvents from "../data/fundraisingEvents.json";

describe("FundraisingPage", () => {
  const renderFundraisingPage = () => {
    return render(
      <MemoryRouter>
        <FundraisingPage />
      </MemoryRouter>
    );
  };

  it("renders page title and description", () => {
    renderFundraisingPage();
    expect(screen.getByText("Fundraising Events")).toBeInTheDocument();
    expect(
      screen.getByText(/Join me in making a difference/)
    ).toBeInTheDocument();
  });

  it("separates current and past events correctly", () => {
    renderFundraisingPage();
    const currentEvents = fundraisingEvents.filter((event) => !event.completed);
    const pastEvents = fundraisingEvents.filter((event) => event.completed);

    if (currentEvents.length > 0) {
      expect(screen.getByText("Current Events")).toBeInTheDocument();
      currentEvents.forEach((event) => {
        expect(screen.getByText(event.title)).toBeInTheDocument();
      });
    }

    if (pastEvents.length > 0) {
      expect(screen.getByText("Past Events")).toBeInTheDocument();
      pastEvents.forEach((event) => {
        expect(screen.getByText(event.title)).toBeInTheDocument();
      });
    }
  });

  it("displays event cards with correct information", () => {
    renderFundraisingPage();
    fundraisingEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
      expect(screen.getByText(event.shortDescription)).toBeInTheDocument();
      expect(screen.getByText(event.date)).toBeInTheDocument();
    });
  });
});
