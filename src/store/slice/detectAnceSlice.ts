import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

interface DetectAnceResponse {
  imageUrl: string;       // URL Object từ blob ảnh
  numAcne: number;        // Số lượng nốt mụn
  acneRatio: number;      // Diện tích vùng mụn %
  severity: "low" | "medium" | "high"|"none"; // Mức độ mụn
}

interface DetectAnceState {
  loading: boolean;
  result: DetectAnceResponse | null;
  error: string | null;
}

const initialState: DetectAnceState = {
  loading: false,
  result: null,
  error: null
};

export const fetchDetectAnce = createAsyncThunk<
  DetectAnceResponse,
  File,
  { rejectValue: string }
>("DetectAnce/fetchDetectAnce", async (file, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosClient.post("/detect-acne", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob", // Nhận ảnh dưới dạng blob
    });

    const numAcne = Number(response.headers["x-num-acne"]);
    const acneRatio = Number(response.headers["x-acne-ratio"]);
    const severity = response.headers["x-severity"];

    const imageUrl = URL.createObjectURL(response.data);
    return {
      imageUrl,
      numAcne,
      acneRatio,
      severity,
    };
  } catch (error: any) {
    console.error("Error in fetchDetectAnce:", error);
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || error?.message || "Lỗi khi gọi API dự đoán"
    );
  }
});

export const detectAnceSlice = createSlice({
  name: "DetectAnce",
  initialState,
  reducers: {
    clearDetectAnce: (state) => {
      // Clean up the previous image URL to prevent memory leaks
      if (state.result?.imageUrl) {
        URL.revokeObjectURL(state.result.imageUrl);
      }
      state.result = null;
      state.error = null;
      state.loading = false;
    },
    clearDetectAnceError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetectAnce.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetectAnce.fulfilled, (state, action: PayloadAction<DetectAnceResponse>) => {
        // Clean up previous image URL before setting new one
        if (state.result?.imageUrl) {
          URL.revokeObjectURL(state.result.imageUrl);
        }
        state.loading = false;
        state.result = action.payload;
        state.error = null;
      })
      .addCase(fetchDetectAnce.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.result = null;
      });
  },
});

export const { clearDetectAnce, clearDetectAnceError } = detectAnceSlice.actions;
export default detectAnceSlice.reducer;