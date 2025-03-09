import { renderHook, act } from "@testing-library/react";
import useFetchAnime from "../../hooks/useFetchAnime.tsx";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/store.ts";

describe("useFetchAnime", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  it("should get parameters from hook", () => {
    const { result } = renderHook(() => useFetchAnime(), { wrapper });
    expect(result.current.animeNameRef).toBeDefined();
    expect(result.current.animeNameRef.current).toBeNull();
    expect(typeof result.current.getAnimeList).toBe("function");
    expect(result.current.animeList).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.pagination).toBeNull();
  });

  it("should update localStorage and prevent default form submission on getAnimeList call", () => {
    const input = document.createElement("input");
    input.value = "Attack on Titan";

    const form = document.createElement("form");
    form.appendChild(input);

    const fakeEvent = {
      preventDefault: vi.fn(),
      currentTarget: form,
    } as unknown as React.FormEvent<HTMLFormElement>;

    const { result } = renderHook(() => useFetchAnime(), { wrapper });

    act(() => {
      result.current.getAnimeList(fakeEvent);
    });

    expect(fakeEvent.preventDefault).toHaveBeenCalled();

    expect(localStorage.getItem("animeName")).toBe("Attack on Titan");
  });
});
