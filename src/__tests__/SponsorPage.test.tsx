import { render, screen } from "@testing-library/react";
import SponsorPage from "../components/SponsorPage";
import justGivingConfig from "../data/justGivingConfig.json";

describe("SponsorPage", () => {
  const mockLocation = window.location;

  beforeAll(() => {
    delete window.location;
    window.location = { ...mockLocation, href: "" };
  });

  afterAll(() => {
    window.location = mockLocation;
  });

  it("renders loading message", () => {
    render(<SponsorPage />);
    expect(
      screen.getByText("Redirecting to JustGiving...")
    ).toBeInTheDocument();
    expect(screen.getByText("Thank you for your support!")).toBeInTheDocument();
  });

  it("redirects to JustGiving URL", () => {
    render(<SponsorPage />);
    expect(window.location.href).toBe(justGivingConfig.defaultUrl);
  });
});
