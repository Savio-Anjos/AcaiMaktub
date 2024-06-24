import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../rootReducer";

export interface IAcai {
  _id: string;
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

export const createAcai = createAsyncThunk(
  "acai/createAcai",
  async (newAcai: Omit<IAcai, "_id">) => {
    const response = await axios.post("http://localhost:3333/acai", newAcai);
    return response.data;
  }
);

export const deleteAcai = createAsyncThunk(
  "acai/deleteAcai",
  async (_id: string) => {
    await axios.delete(`http://localhost:3333/acai/${_id}`);
    return _id;
  }
);

export const acaiSlice = createSlice({
  name: "acai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcais.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcais.fulfilled, (state, action) => {
        state.loading = false;
        state.acais = action.payload;
      })
      .addCase(fetchAcais.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch acais";
      })
      .addCase(createAcai.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAcai.fulfilled, (state, action) => {
        state.loading = false;
        state.acais.push(action.payload);
      })
      .addCase(createAcai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create acai";
      })
      .addCase(deleteAcai.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAcai.fulfilled, (state, action) => {
        state.loading = false;
        state.acais = state.acais.filter((acai) => acai._id !== action.payload);
      })
      .addCase(deleteAcai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete acai";
      });
  },
});

export const selectAcais = (state: RootState) => state.acai.acais;
export const selectLoading = (state: RootState) => state.acai.loading;
export const selectError = (state: RootState) => state.acai.error;

export default acaiSlice.reducer;
