import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FilmPlayer } from "@/components/site/FilmPlayer";

const film = { slug: "matt-angie", couple: "Matt & Angie", image: "/poster.jpg", vimeoId: "1105665651" };

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("Film playback recovery", () => {
  it("offers recovery when Vimeo never responds", () => {
    vi.useFakeTimers();
    render(<FilmPlayer film={film} />);
    act(() => { vi.advanceTimersByTime(12000); });
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Watch on Vimeo" }).getAttribute("href")).toBe("https://vimeo.com/1105665651");
  });

  it("keeps a player available when Vimeo confirms it is ready", () => {
    vi.useFakeTimers();
    render(<FilmPlayer film={film} />);
    const frame = screen.getByTitle("Matt & Angie wedding film") as HTMLIFrameElement;
    act(() => {
      window.dispatchEvent(new MessageEvent("message", { origin: "https://player.vimeo.com", source: frame.contentWindow, data: { event: "ready" } }));
      vi.advanceTimersByTime(12000);
    });
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByTitle("Matt & Angie wedding film")).toBeTruthy();
  });

  it("ignores player error messages from a different origin", () => {
    render(<FilmPlayer film={film} />);
    const frame = screen.getByTitle("Matt & Angie wedding film") as HTMLIFrameElement;
    act(() => {
      window.dispatchEvent(new MessageEvent("message", { origin: "https://example.com", source: frame.contentWindow, data: { event: "error" } }));
    });
    expect(screen.queryByRole("status")).toBeNull();
  });
});