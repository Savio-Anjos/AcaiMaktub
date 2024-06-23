import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../rootReducer";

interface IAcai {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  imageUrl: string;
}

export interface IAcaiState {
  acais: IAcai[];
  loading: boolean;
  error: string | null;
}

const initialState: IAcaiState = {
  acais: [],
  loading: false,
  error: null,
};

export const fetchAcais = createAsyncThunk("acai/fetchAcais", async () => {
  const response = await axios.get("http://localhost:3333/acai");
  return response.data;
});

export const acaiSlice = createSlice({
  name: "acai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAcais.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(fetchAcais.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch acais";
      });
  },
});

export const selectAcais = (state: RootState) => state.acai.acais;
export const selectLoading = (state: RootState) => state.acai.loading;
export const selectError = (state: RootState) => state.acai.error;

export default acaiSlice.reducer;
