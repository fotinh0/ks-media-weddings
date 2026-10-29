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
    const slides = screen.getAllByRole("figure");
    expect(slides[0].getAttribute("aria-hidden")).toBe("false");

    fireEvent.click(screen.getByRole("button", { name: "Next story" }));

    expect(slides[0].getAttribute("aria-hidden")).toBe("true");
    expect(slides[1].getAttribute("aria-hidden")).toBe("false");
  });

  it("auto-advances every 7 seconds until paused", () => {
    vi.useFakeTimers();
    render(<TestimonialSection />);
    const slides = screen.getAllByRole("figure");

    act(() => {
      vi.advanceTimersByTime(7000);
    });
    expect(slides[1].getAttribute("aria-hidden")).toBe("false");

    // Pausing on hover stops the rotation.
    fireEvent.mouseEnter(screen.getByRole("group") ?? slides[0].parentElement!);
    act(() => {
      vi.advanceTimersByTime(14000);
    });
    expect(slides[1].getAttribute("aria-hidden")).toBe("false");
  });
});
