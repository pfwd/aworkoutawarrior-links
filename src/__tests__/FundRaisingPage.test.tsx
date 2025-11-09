import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FundRaisingPage from "../components/FundraisingPage";
import fundraisingEvents from "..//data/fundraisingEvents.json";

const renderPage = () =>
  render(
    <MemoryRouter>
      <FundRaisingPage />
    </MemoryRouter>
  );

describe("FundRaisingPage", () => {
  it("renders all event titles", () => {
    renderPage();
    fundraisingEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });

  it("renders short descriptions for events that have them", () => {
    renderPage();
    const eventsWithShort = fundraisingEvents.filter(
      (e) => e.shortDescription && e.shortDescription.trim().length > 0
    );
    eventsWithShort.forEach((event) => {
      expect(screen.getByText(event.shortDescription)).toBeInTheDocument();
    });
  });

  it("renders dates for events that have them", () => {
    renderPage();
    const eventsWithDate = fundraisingEvents.filter(
      (e) => e.date && e.date.trim().length > 0
    );
    eventsWithDate.forEach((event) => {
      expect(screen.getByText(event.date)).toBeInTheDocument();
    });
  });

  it("renders current event titles", () => {
    renderPage();
    const currentEvents = fundraisingEvents.filter((e) => !e.completed);
    currentEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });

  it("renders past event titles", () => {
    renderPage();
    const pastEvents = fundraisingEvents.filter((e) => e.completed);
    pastEvents.forEach((event) => {
      expect(screen.getByText(event.title)).toBeInTheDocument();
    });
  });
});
