import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InquiryForm } from "@/components/site/InquiryForm";
import { packages } from "@/lib/films";

describe("Inquiry form package options", () => {
  it("offers every package with its real price", () => {
    render(<InquiryForm />);
    const select = screen.getByRole("combobox", { name: /package interest/i });

    const options = Array.from(select.querySelectorAll("option")).map((o) => o.textContent);

    for (const p of packages) {
      expect(options).toContain(`${p.name} — ${p.price}`);
    }
    // Guard against stale prices drifting back into the markup.
    expect(options).not.toContain("The Highlight — $2,850");
    expect(options).not.toContain("The Story — $3,250");
    expect(options).not.toContain("The Heirloom — $4,050");
  });
});
