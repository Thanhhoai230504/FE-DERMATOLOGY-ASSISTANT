import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Fab,
  Fade,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Heart,
  MessageCircle,
  Play,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { clearChatbotResponse } from "../../store/slice/chatBotSlice";
import {
  clearPrediction,
  fetchPrediction,
} from "../../store/slice/predictImage";
import ImageDisplay from "./ImageDisplay";
import ImageUpload from "./ImageUpload";
import PredictionResults from "./PredictionResults";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#ff5983",
      dark: "#9a0036",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

const PredictImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const navigate = useNavigate();
  const loading = useSelector(
    (state: RootState) => state.predictImageState.loading
  );
  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file);
    setIsAnalyzing(false);
  };

  const dispatch = useDispatch<any>();
  const handleAnalyze = async () => {
    if (selectedImage) {
      await dispatch(fetchPrediction(selectedImage));
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setIsAnalyzing(false);
    dispatch(clearPrediction());
    dispatch(clearChatbotResponse());
    setResetKey((prev) => prev + 1);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {/* Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Toolbar>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Heart size={24} color="white" />
              </Box>
              <Typography variant="h6" component="div" fontWeight={700}>
                MedicalAI - Hệ thống Phân tích Hình ảnh Y tế
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {/* Introduction Section */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 4,
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              border: "1px solid",
              borderColor: "primary.light",
              borderRadius: 3,
            }}
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 3,
                  backgroundColor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stethoscope size={40} color="white" />
              </Box>
              <Box flex={1}>
                <Typography variant="h4" color="primary" gutterBottom>
                  Phân tích Hình ảnh Y tế Thông minh
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Sử dụng công nghệ AI tiên tiến để phân tích hình ảnh da, hỗ
                  trợ chẩn đoán nhanh chóng và chính xác các bệnh lý về da. Tải
                  lên hình ảnh tổn thương da để nhận kết quả phân tích chi tiết
                  và các khuyến nghị y tế phù hợp.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Main Analysis Grid */}
          <Grid container spacing={4}>
            {/* Image Upload Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                key={resetKey}
              />
            </Grid>

            {/* Image Display Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <ImageDisplay
                selectedImage={selectedImage}
                isAnalyzing={isAnalyzing}
              />
            </Grid>

            {/* Results Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <PredictionResults
                selectedImage={selectedImage}
                isAnalyzing={isAnalyzing}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {selectedImage && (
            <Fade in>
              <Box
                display="flex"
                justifyContent="center"
                gap={2}
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Play size={20} />}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  sx={{
                    px: 4,
                    py: 1.5,
                    background:
                      "linear-gradient(135deg, #4caf50 0%, #388e3c 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
                    },
                    "&:disabled": {
                      background: "grey.300",
                    },
                  }}
                >
                  {loading ? "Đang phân tích..." : "Bắt đầu phân tích"}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<RotateCcw size={20} />}
                  onClick={handleReset}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderColor: "grey.400",
                    color: "grey.600",
                    "&:hover": {
                      borderColor: "grey.600",
                      backgroundColor: "grey.50",
                    },
                  }}
                >
                  Đặt lại
                </Button>
              </Box>
            </Fade>
          )}
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="secondary"
          onClick={() => navigate("/chatbot")}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            background: "linear-gradient(135deg, #dc004e 0%, #9a0036 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #9a0036 0%, #6d002a 100%)",
            },
          }}
        >
          <MessageCircle size={24} />
        </Fab>

        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 32,
            backgroundColor: "rgba(220, 0, 78, 0.9)",
            color: "white",
            px: 2,
            py: 1,
            borderRadius: 2,
            fontSize: "0.875rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(220, 0, 78, 0.3)",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": {
                opacity: 1,
              },
              "50%": {
                opacity: 0.7,
              },
              "100%": {
                opacity: 1,
              },
            },
          }}
        >
          💬 AI Doctor Assistant
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PredictImage;
