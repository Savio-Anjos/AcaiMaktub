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

//Listagem de Açaís
export const fetchAcais = createAsyncThunk("acai/fetchAcais", async () => {
  const response = await axios.get("http://localhost:3333/acai");
  return response.data;
});

//Criação de Açaís
export const createAcai = createAsyncThunk(
  "acai/createAcai",
  async (newAcai: Omit<IAcai, "_id">) => {
    const response = await axios.post("http://localhost:3333/acai", newAcai);
    return response.data;
  }
);

//Deleção de Açaís
export const deleteAcai = createAsyncThunk(
  "acai/deleteAcai",
  async (_id: string) => {
    await axios.delete(`http://localhost:3333/acai/${_id}`);
    return _id;
  }
);

//Atualização de Açaís
export const updateAcai = createAsyncThunk(
  "acai/updateAcai",
  async (updatedAcai: IAcai) => {
    const response = await axios.put(
      `http://localhost:3333/acai/${updatedAcai._id}`,
      updatedAcai
    );
    return response.data;
  }
);

export const acaiSlice = createSlice({
  name: "acai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Listagem de Açaís
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

      //Criação de Açaís
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

      //Deleção de Açaís
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
      })

      //Atualização de Açaís
      .addCase(updateAcai.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAcai.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.acais.findIndex(
          (acai) => acai._id === action.payload._id
        );
        if (index !== -1) {
          state.acais[index] = action.payload;
        }
      })
      .addCase(updateAcai.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update acai";
      });
  },
});

export const selectAcais = (state: RootState) => state.acai.acais;
export const selectLoading = (state: RootState) => state.acai.loading;
export const selectError = (state: RootState) => state.acai.error;

export default acaiSlice.reducer;
