import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE } from "../../api/Config";
import type { Book } from "../../models/Book";

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  totalPages: number;
  count: number;
}

interface BookState {
  catalog: Book[];
  searchResults: Book[];
  genres: string[];
  searchTerm: string;
  loadingBooks: boolean;
  loadingGenres: boolean;
  error: string | null;
  termActive: boolean;

  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const initialState: BookState = {
  catalog: [],
  searchResults: [],
  searchTerm: "",
  genres: [],
  loadingBooks: false,
  loadingGenres: false,
  error: null,
  termActive: false,

  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
};

// Fetch paginated books
export const fetchBooks = createAsyncThunk<
  PaginatedResponse<Book>,
  { page?: number; limit?: number; genre?: string }
>("books/all", async ({ page = 1, limit = 24, genre }, thunkAPI) => {
  try {
    let url = `${API_BASE}/books?page=${page}&limit=${limit}`;
    if (genre && genre !== "All") url += `&genre=${genre}`;
    const response = await axios.get<PaginatedResponse<Book>>(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch books");
  }
});

// Search books
export const searchBooks = createAsyncThunk<
  { term: string; response: PaginatedResponse<Book> },
  { term: string; page?: number; limit?: number }
>("books/search", async ({ term, page = 1, limit = 24 }, thunkAPI) => {
  try {
    const response = await axios.get<PaginatedResponse<Book>>(
      `${API_BASE}/books/search?term=${term}&page=${page}&limit=${limit}`
    );
    return { term, response: response.data };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to search books");
  }
});

// Fetch genres
export const fetchGenres = createAsyncThunk<string[]>(
  "books/genres",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE}/books/genres`);
      // Extract only the array of genres
      return response.data.data; // assumes backend returns { message, count, data: string[] }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch genres");
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.termActive = false;
      state.searchResults = [];
      state.page = 1;
      state.total = 0;
      state.totalPages = 0;
       state.searchTerm = "";
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loadingBooks = true;
        state.error = null;
        state.termActive = false;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<PaginatedResponse<Book>>) => {
        state.loadingBooks = false;
        state.catalog = action.payload.data;
        state.page = action.payload.page;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.termActive = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.payload as string;
      })

      // Search books
      .addCase(searchBooks.pending, (state) => {
        state.loadingBooks = true;
        state.error = null;
      })
      .addCase(
        searchBooks.fulfilled,
        (state, action: PayloadAction<{ term: string; response: PaginatedResponse<Book> }>) => {
          state.loadingBooks = false;
          state.searchResults = action.payload.response.data;
          state.page = action.payload.response.page;
          state.total = action.payload.response.total;
          state.totalPages = action.payload.response.totalPages;
          state.termActive = true;
          state.searchTerm = action.payload.term;
        }
      )
      .addCase(searchBooks.rejected, (state, action) => {
        state.loadingBooks = false;
        state.error = action.payload as string;
        state.termActive = false;
      })

      // Fetch genres
      .addCase(fetchGenres.pending, (state) => {
        state.loadingGenres = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.loadingGenres = false;
        state.genres = action.payload; // Now this is correct string[]
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loadingGenres = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearch, setPage, setLimit } = bookSlice.actions;
export default bookSlice.reducer;
