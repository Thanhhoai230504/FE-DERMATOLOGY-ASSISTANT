import { configureStore } from "@reduxjs/toolkit";
import  predictionSlice  from "./slice/predictImage";
import chatbotSlice from "./slice/chatBotSlice";
import  detectAnceSlice  from "./slice/detectAnceSlice";


const store = configureStore({
  reducer: {
    predictImageState : predictionSlice, 
    chatBotState: chatbotSlice,
    detectAnceState: detectAnceSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;