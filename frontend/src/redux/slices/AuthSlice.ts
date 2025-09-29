import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { FetchUserPayload, LoginUserPayload, RegisterUserPayload, User } from '../../models/User';

interface AuthSliceState {
  loggedin: User | null;
  profile: User | null;
  libraryCard: string | null;
  loading: boolean;
  error: string | boolean | null;
  registerSuccess: boolean;
}

const initialState: AuthSliceState = {
  loggedin: null,
  profile: null,
  loading: false,
  libraryCard: null,
  error: null,
  registerSuccess: false,
};

//  Async Thunks
export const loginUser = createAsyncThunk<User, LoginUserPayload, { rejectValue: string }>(
  'auth/login',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', user);
      return response.data.user as User;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk<User, RegisterUserPayload, { rejectValue: string }>(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/register', user);
      return response.data.user as User;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || 'Register failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:8000/users/${payload.userId}`);
      return { user: response.data.data as User, property: payload.property };
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || 'Fetch user failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (payload: User, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8000/users`, payload);
      return response.data.data as User;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || 'Update user failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createLibraryCard = createAsyncThunk(
  'auth/createLibraryCard',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8000/card", { user: userId });
      return response.data.card;
    } catch (error) {
      return thunkAPI.rejectWithValue('Feiled to create library card');

    }
  }
);


// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },

    resetUser(state, action: PayloadAction<'loggedin' | 'profile'>) {
      if (action.payload === 'loggedin') {
        state.loggedin = null;
      } else if (action.payload === 'profile') {
        state.profile = null;
      }
    }


  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedin = action.payload;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Register failed';
      });

    // Fetch User
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.property === 'loggedin') {
          state.loggedin = action.payload.user;
        } else {
          state.profile = action.payload.user;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });

    // Update User
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedin = action.payload;
        state.profile = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
    // Fetch Library Card
    builder
      .addCase(createLibraryCard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createLibraryCard.fulfilled, (state, action) => {
        state.loading = false;
        state.libraryCard = action.payload._id;
      })
      .addCase(createLibraryCard.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetRegisterSuccess, resetUser } = authSlice.actions;
export default authSlice.reducer;
