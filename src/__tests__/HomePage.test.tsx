import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../components/HomePage";
import profileData from "../data/profile.json";
import linkGroups from "../data/linkGroups.json";

describe("HomePage", () => {
  const renderHome = () =>
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

  it("renders profile info", () => {
    renderHome();
    expect(screen.getByAltText(profileData.name)).toBeInTheDocument();
    expect(screen.getByText(profileData.name)).toBeInTheDocument();
    expect(screen.getByText(profileData.bio)).toBeInTheDocument();
  });

  it("renders all link group titles and non-empty descriptions", () => {
    renderHome();
    linkGroups.forEach((group) => {
      expect(screen.getByText(group.title)).toBeInTheDocument();
    });

    const descriptions = linkGroups
      .map((g) => g.description)
      .filter((d) => Boolean(d) && d.trim().length > 0);
    descriptions.forEach((desc) => {
      expect(screen.getByText(desc as string)).toBeInTheDocument();
    });
  });

  it("renders links with correct hrefs and target attributes", () => {
    renderHome();
    const allLinks = linkGroups.flatMap((g) => g.links);

    const internalLinks = allLinks.filter((l) => l.internal);
    internalLinks.forEach((l) => {
      const anchor = screen.getByRole("link", { name: l.name });
      expect(anchor).toHaveAttribute("href", l.url);
      expect(anchor).not.toHaveAttribute("target", "_blank");
    });

    const externalLinks = allLinks.filter((l) => !l.internal);
    externalLinks.forEach((l) => {
      const anchor = screen.getByRole("link", { name: l.name });
      expect(anchor).toHaveAttribute("href", l.url);
      expect(anchor).toHaveAttribute("target", "_blank");
    });
  });
});
