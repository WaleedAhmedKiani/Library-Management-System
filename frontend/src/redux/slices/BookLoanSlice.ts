import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { LoanRecord, CreateLoanPayload } from "../../models/Libraryloan";

interface LoanState {
  records: LoanRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: LoanState = {
  records: [],
  loading: false,
  error: null,
};

// Create loan record
export const createLoan = createAsyncThunk<
  LoanRecord,
  CreateLoanPayload,
  { rejectValue: string }
>("loan/create", async (record, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/loan", record);
    return response.data.record; // backend returns { message, record }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to create loan"
    );
  }
});

// Update loan record

// ✅ Update loan record (minimal payload for Joi validation)
export const updateLoan = createAsyncThunk<
  LoanRecord,
  { id: string; updates: Partial<LoanRecord> },
  { rejectValue: string; state: { loan: LoanState } }
>("loan/update", async ({ id, updates }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const existing = state.loan.records.find((r) => r._id === id);

    if (!existing) {
      return thunkAPI.rejectWithValue("Loan record not found in state");
    }

    // ✅ Always include _id
    const payload: any = { _id: id };

    // ✅ Use updates if provided, else fallback to existing (to satisfy Joi)
    if (updates.status) payload.status = updates.status;
    if (updates.returnedDate) payload.returnedDate = updates.returnedDate;
    if (updates.loanedDate || existing.loanedDate)
      payload.loanedDate = updates.loanedDate || existing.loanedDate;
    if (updates.dueDate || existing.dueDate)
      payload.dueDate = updates.dueDate || existing.dueDate;

    // ✅ Normalize IDs (patron, employees, item)
    const normalizeId = (val: any) =>
      val && typeof val === "object" && "_id" in val ? val._id : val;

    payload.parton = normalizeId(updates.parton || existing.parton);
    payload.employeeOut = normalizeId(updates.employeeOut || existing.employeeOut);
    if (updates.employeeIn || existing.employeeIn) {
      payload.employeeIn = normalizeId(updates.employeeIn || existing.employeeIn);
    }
    payload.item = normalizeId(updates.item || existing.item);

    const response = await axios.put(
      `http://localhost:8000/loan/${id}`,
      payload
    );
    return response.data.record;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.error || "Failed to update loan"
    );
  }
});



// Get all loan records
export const fetchLoans = createAsyncThunk<
  LoanRecord[],
  void,
  { rejectValue: string }
>("loan/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:8000/loan");
    return response.data.records;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to fetch loans");
  }
});

// Query loan records
export const queryLoans = createAsyncThunk<
  LoanRecord[],
  { property: string; value: string | Date },
  { rejectValue: string }
>("loan/query", async ({ property, value }, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/loan/query", { property, value });
    return response.data.records;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.error || "Failed to query loans");
  }
});

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    clearLoans: (state) => {
      state.records = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Loan
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoan.fulfilled, (state, action: PayloadAction<LoanRecord>) => {
        state.loading = false;
        // Add or replace record by _id to avoid duplicates
        const index = state.records.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) {
          state.records[index] = action.payload;
        } else {
          state.records.push(action.payload);
        }
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create loan";
      })

      // Update Loan
      .addCase(updateLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        .addCase(updateLoan.fulfilled, (state, action) => {
            state.loading = false;
    if (!action.payload) return;

    const index = state.records.findIndex((r) => r._id === action.payload._id);

    if (index !== -1) {
      // ✅ Merge updates into existing record instead of replacing whole object
      state.records[index] = {
        ...state.records[index],
        ...action.payload,
      };
    } else {
      // If record not in state, push it (fallback)
      state.records.push(action.payload);
    }
  })
      .addCase(updateLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update loan";
      })

      // Fetch All Loans
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action: PayloadAction<LoanRecord[]>) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch loans";
      })

      // Query Loans
      .addCase(queryLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(queryLoans.fulfilled, (state, action: PayloadAction<LoanRecord[]>) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(queryLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to query loans";
      });
  },
});

export const { clearLoans } = loanSlice.actions;
export default loanSlice.reducer;
