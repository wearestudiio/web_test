import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { UniverseCard } from "@/components/universe-card";

describe("UniverseCard", () => {
  it("renders universe details", () => {
    render(
      <UniverseCard
        slug="worm"
        name="WORM"
        manifesto="Nightlife organism"
        paletteNotes="oil slick"
        accentColor="#000"
      />,
    );
    expect(screen.getByText("WORM")).toBeInTheDocument();
    expect(screen.getByText(/Nightlife/)).toBeInTheDocument();
  });
});
