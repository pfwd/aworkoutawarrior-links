import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EventDetailPage from "../components/EventDetailPage";
import eventDetails from "../data/eventDetails.json";

describe("EventDetailPage", () => {
  const renderEventDetailPage = (eventId: string) => {
    return render(
      <MemoryRouter initialEntries={[`/events/${eventId}`]}>
        <Routes>
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders event not found for invalid event ID", () => {
    renderEventDetailPage("invalid-id");
    expect(screen.getByText("Event Not Found")).toBeInTheDocument();
  });

  it("renders event details correctly for valid event", () => {
    const eventId = Object.keys(eventDetails)[0];
    const event = eventDetails[eventId as keyof typeof eventDetails];
    renderEventDetailPage(eventId);

    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.getByText(event.date)).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByText(event.targetAmount)).toBeInTheDocument();
  });

  it("renders progress bar correctly", () => {
    const eventId = Object.keys(eventDetails)[0];
    const event = eventDetails[eventId as keyof typeof eventDetails];
    renderEventDetailPage(eventId);

    const progress =
      (parseFloat(event.raisedAmount.replace(/[£,]/g, "")) /
        parseFloat(event.targetAmount.replace(/[£,]/g, ""))) *
      100;

    expect(screen.getByText(`${Math.round(progress)}%`)).toBeInTheDocument();
  });
});
