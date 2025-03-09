import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "../../views/Layout.tsx";
import * as useFetchAnime from "../../hooks/useFetchAnime.tsx";
import * as useTheme from "../../hooks/useTheme.tsx";
import { AnimeItem } from "@/services/apiSlices.types.ts";
import { configureStore } from "@reduxjs/toolkit";
import selectedAnimeReducer from "@/store/slices/selectedAnimeSlice.ts";
import ErrorBoundary from "../../components/ErrorBoundary.tsx";

const createTestStore = (preloadedState: {
  selectedAnimeList: AnimeItem[];
}) => {
  return configureStore({
    reducer: {
      selectedAnime: selectedAnimeReducer,
    },
    preloadedState: {
      selectedAnime: preloadedState,
    },
  });
};

let store: ReturnType<typeof createTestStore>;

describe("Layout Component", () => {
  beforeEach(() => {
    store = createTestStore({
      selectedAnimeList: [
        {
          mal_id: 1,
          title: "Naruto",
          title_english: "Naruto",
          title_japanese: "ナルト",
          genres: [{ name: "Action" }, { name: "Adventure" }],
          episodes: 220,
          status: "Finished Airing",
          aired: {
            prop: {
              from: { day: 3, month: 10, year: 2002 },
              to: { day: 8, month: 2, year: 2007 },
            },
          },
          score: 7.9,
          synopsis: "Ninja adventure story.",
          images: {
            jpg: {
              large_image_url: "https://example.com/naruto.jpg",
            },
          },
        },
        {
          mal_id: 2,
          title: "One Piece",
          title_english: "One Piece",
          title_japanese: "ワンピース",
          genres: [{ name: "Adventure" }, { name: "Comedy" }],
          episodes: 1000,
          status: "Airing",
          aired: {
            prop: {
              from: { day: 20, month: 10, year: 1999 },
              to: { day: 1, month: 1, year: 2025 },
            },
          },
          score: 8.9,
          synopsis: "Pirate adventure story.",
          images: {
            jpg: {
              large_image_url: "https://example.com/onepiece.jpg",
            },
          },
        },
      ],
    });

    vi.spyOn(store, "dispatch");

    // Mock custom hooks
    vi.spyOn(useFetchAnime, "default").mockReturnValue({
      animeList: store.getState().selectedAnime.selectedAnimeList,
      getAnimeList: vi.fn(),
      pagination: {
        isFirstPage: false,
        isLastPage: false,
        lastPage: 10,
      },
      isError: false,
      isLoading: false,
      error: undefined,
      animeNameRef: { current: null },
    });

    vi.spyOn(useTheme, "default").mockReturnValue("light");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRedux = (searchParam = "") =>
    render(
      <ErrorBoundary fallback={"error"}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[`/?limit=${searchParam}`]}>
            <Layout />
          </MemoryRouter>
        </Provider>
      </ErrorBoundary>,
    );

  it("should render without crashing", () => {
    renderWithRedux();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("should trigger search on submit (Line 58)", () => {
    const { getByPlaceholderText } = renderWithRedux();
    const searchInput = getByPlaceholderText(
      "Type what kind of anime are you looking for?",
    );

    fireEvent.change(searchInput, { target: { value: "Bleach" } });
    fireEvent.submit(searchInput);

    expect(useFetchAnime.default().getAnimeList).toHaveBeenCalled(); // Check if search function triggers
  });

  it("should apply correct grid layout based on search params (Line 68)", () => {
    renderWithRedux("6"); // Limit set to 6

    const gridElement = screen
      .getByTestId("layout")
      .querySelector(".grid-cols-3");
    expect(gridElement).toBeInTheDocument();
  });

  it("should trigger ErrorComponent on button click (Lines 82-83)", () => {
    renderWithRedux();
    const errorButton = screen.getByTestId("errorButton");
    fireEvent.click(errorButton);
    screen.debug();

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("should render Pagination when animeList and pagination exist (Line 98)", () => {
    renderWithRedux();

    expect(screen.getByTestId("pagination")).toBeInTheDocument(); // Assuming Pagination has a test ID
  });
});
