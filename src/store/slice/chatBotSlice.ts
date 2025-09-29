import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";

interface ChatbotState {
  loading: boolean;
  response: string | null;
  error: string | null;
}

const initialState: ChatbotState = {
  loading: false,
  response: null,
  error: null,
};

export const fetchChatMessage = createAsyncThunk<
  string, // Trả về: string từ chatbot
  string, // Payload: câu hỏi
  { rejectValue: string }
>("chatbot/fetchChatMessage", async (message, thunkAPI) => {
  try {
    const response = await axiosClient.post(
      "/ask",
      { question: message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Giả sử chatbot trả về response.data.answer
    return response.data.answer;
  } catch (error: any) {
    console.error("Lỗi khi gọi Chat API:", error);
    return thunkAPI.rejectWithValue("Lỗi khi gọi chatbot");
  }
});

const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    clearChatbotResponse: (state) => {
      state.response = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.response = action.payload;
      })
      .addCase(fetchChatMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi không xác định";
      });
  },
});

export const { clearChatbotResponse } = chatbotSlice.actions;
export default chatbotSlice.reducer;
