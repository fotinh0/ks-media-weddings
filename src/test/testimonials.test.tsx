import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestimonialSection } from "@/components/site/Testimonials";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Testimonial carousel", () => {
  it("shows the following quote when the next button is clicked", () => {
    render(<TestimonialSection />);
    const slides = screen.getAllByRole("figure", { hidden: true });
    expect(slides.length).toBe(5);
    expect(slides[0]!.getAttribute("aria-hidden")).toBe("false");

    fireEvent.click(screen.getByRole("button", { name: "Next story" }));

    expect(slides[0]!.getAttribute("aria-hidden")).toBe("true");
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");
  });

  it("auto-advances every 7 seconds until paused", () => {
    vi.useFakeTimers();
    render(<TestimonialSection />);
    const slides = screen.getAllByRole("figure", { hidden: true });

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");

    // Pausing on hover stops the rotation.
    fireEvent.mouseEnter(slides[0]!.parentElement!);
    act(() => {
      vi.advanceTimersByTime(14000);
    });
    expect(slides[1]!.getAttribute("aria-hidden")).toBe("false");
  });
});
