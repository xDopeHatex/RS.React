import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/store/store";
import Details from "../../views/Details.tsx";
import ThemeProvider from "../../providers/ThemeProvider.tsx";
import * as apiSlice from "@/services/apiSlices.ts";
import * as useCloseDetails from "../../hooks/useCloseDetails.tsx";

const createWrapper = (initialEntry: string) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialEntry]}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
  }
  return Wrapper;
};

describe("Details Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders spinner initially", () => {
    vi.spyOn(apiSlice, "useGetAnimeByIdQuery").mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: undefined,
      isFetching: false, // ✅ Required by RTK Query
      refetch: vi.fn(), // ✅ Required by RTK Query
    });

    render(<Details />, { wrapper: createWrapper("/details?id=123") });
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("displays error message on API error", () => {
    vi.spyOn(apiSlice, "useGetAnimeByIdQuery").mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: new Error("Failed to fetch anime details"),
      isFetching: false, // ✅ Required by RTK Query
      refetch: vi.fn(), // ✅ Required by RTK Query
    });

    render(<Details />, { wrapper: createWrapper("/details?id=123") });
    expect(
      screen.getByText(/Failed to fetch anime details/i),
    ).toBeInTheDocument();
  });

  it("renders anime details correctly when data is loaded", () => {
    vi.spyOn(apiSlice, "useGetAnimeByIdQuery").mockReturnValue({
      data: {
        data: {
          mal_id: 1,
          title: "Naruto",
          score: 7.9,
          status: "Finished Airing",
          aired: {
            prop: {
              from: { year: 2002, month: 10, day: 3 },
              to: { year: 2007, month: 2, day: 8 },
            },
          },
          images: {
            jpg: {
              large_image_url: "https://example.com/naruto.jpg",
            },
          },
        },
      },
      isLoading: false,
      isError: false,
      error: undefined,
      isFetching: false, // ✅ Required by RTK Query
      refetch: vi.fn(), // ✅ Required by RTK Query
    });

    render(<Details />, { wrapper: createWrapper("/details?id=1") });

    // Check for title, score, status, and airing dates
    expect(screen.getByText(/Title - Naruto/i)).toBeInTheDocument();
    expect(screen.getByText(/Score - 7.9/i)).toBeInTheDocument();
    expect(screen.getByText(/Status - Finished Airing/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Aired from 2002.10.3 to 2007.2.8/i),
    ).toBeInTheDocument();

    // Check if the image is rendered
    const image = screen.getByAltText(/image of the Naruto anime/i);
    expect(image).toHaveAttribute("src", "https://example.com/naruto.jpg");
  });

  it("closes details on button click", () => {
    const closeDetailsHandler = vi.fn();
    vi.spyOn(useCloseDetails, "default").mockReturnValue(closeDetailsHandler);

    vi.spyOn(apiSlice, "useGetAnimeByIdQuery").mockReturnValue({
      data: {
        data: {
          mal_id: 1,
          title: "Naruto",
          score: 7.9,
          status: "Finished Airing",
          aired: {
            prop: {
              from: { year: 2002, month: 10, day: 3 },
              to: { year: 2007, month: 2, day: 8 },
            },
          },
          images: {
            jpg: {
              large_image_url: "https://example.com/naruto.jpg",
            },
          },
        },
      },
      isLoading: false,
      isError: false,
      error: undefined,
      isFetching: false, // ✅ Required by RTK Query
      refetch: vi.fn(), // ✅ Required by RTK Query
    });

    render(<Details />, { wrapper: createWrapper("/details?id=1") });

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(closeDetailsHandler).toHaveBeenCalledTimes(1);
  });

  it("closes details when clicking outside the sidebar", () => {
    const closeDetailsHandler = vi.fn();
    vi.spyOn(useCloseDetails, "default").mockReturnValue(closeDetailsHandler);

    vi.spyOn(apiSlice, "useGetAnimeByIdQuery").mockReturnValue({
      data: {
        data: {
          mal_id: 1,
          title: "Naruto",
          score: 7.9,
          status: "Finished Airing",
          aired: {
            prop: {
              from: { year: 2002, month: 10, day: 3 },
              to: { year: 2007, month: 2, day: 8 },
            },
          },
          images: {
            jpg: {
              large_image_url: "https://example.com/naruto.jpg",
            },
          },
        },
      },
      isLoading: false,
      isError: false,
      error: undefined,
      isFetching: false, // ✅ Required by RTK Query
      refetch: vi.fn(), // ✅ Required by RTK Query
    });

    render(<Details />, { wrapper: createWrapper("/details?id=1") });

    // Simulate a click outside the sidebar
    fireEvent.mouseDown(document);

    expect(closeDetailsHandler).toHaveBeenCalledTimes(1);
  });
});
