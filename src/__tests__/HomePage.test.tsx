import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import profileData from "../data/profile.json";
import linkGroups from "../data/linkGroups.json";

describe("HomePage", () => {
  const renderHomePage = () => {
    return render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  };

  it("renders profile information correctly", () => {
    renderHomePage();
    expect(screen.getByAltText(profileData.name)).toBeInTheDocument();
    expect(screen.getByText(profileData.name)).toBeInTheDocument();
    expect(screen.getByText(profileData.bio)).toBeInTheDocument();
  });

  it("renders all link groups", () => {
    renderHomePage();
    linkGroups.forEach((group) => {
      expect(screen.getByText(group.title)).toBeInTheDocument();
      if (group.description) {
        expect(screen.getByText(group.description)).toBeInTheDocument();
      }
    });
  });

  it("renders all links with correct URLs", () => {
    renderHomePage();
    linkGroups.forEach((group) => {
      group.links.forEach((link) => {
        const linkElement = screen.getByText(link.name);
        expect(linkElement).toBeInTheDocument();
        if (link.internal) {
          expect(linkElement.closest("a")).toHaveAttribute("href", link.url);
        } else {
          expect(linkElement.closest("a")).toHaveAttribute("href", link.url);
          expect(linkElement.closest("a")).toHaveAttribute("target", "_blank");
        }
      });
    });
  });
});
