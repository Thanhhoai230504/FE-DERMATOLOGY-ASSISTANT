import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

interface PredictionResponse {
prediction: string;
  confidence: number;
  severity: "low" | "medium" | "high";
  recommendations: string[];
  details: {
    findings: string[];
    riskFactors: string[];
    followUp: string;
  };
}


interface PredictionState {
  loading: boolean;
  result: PredictionResponse | null;
  error: string | null;
}

const initialState: PredictionState = {
  loading: false,
  result: null,
  error: null
};

export const fetchPrediction = createAsyncThunk<
  PredictionResponse, // trả về
  File,               // đầu vào
  { rejectValue: string }
>("prediction/fetchPrediction", async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post("/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue("Lỗi khi gọi API dự đoán");
  }
});


export const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    clearPrediction: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrediction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrediction.fulfilled, (state, action: PayloadAction<PredictionResponse>) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchPrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPrediction } = predictionSlice.actions;
export default predictionSlice.reducer;
