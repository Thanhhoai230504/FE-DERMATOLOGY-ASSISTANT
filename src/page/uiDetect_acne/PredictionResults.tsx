import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Typography,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Clock,
  Target,
  TrendingUp,
  Eye,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChatbotResponse,
  fetchChatMessage,
} from "../../store/slice/chatBotSlice";
import { RootState } from "../../store/store";

interface PredictionResultsProps {
  selectedImage: File | null;
  isAnalyzing: boolean;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  selectedImage,
  isAnalyzing,
}) => {
  const dispatch = useDispatch<any>();

  const acneResults = useSelector(
    (state: RootState) => state.detectAnceState?.result
  );
  console.log("🚀 ~ acneResults:", acneResults);

  const acneLoading = useSelector(
    (state: RootState) => state.detectAnceState?.loading
  );
  const acneError = useSelector(
    (state: RootState) => state.detectAnceState?.error
  );

  const chatbotResponse = useSelector(
    (state: RootState) => state.chatBotState.response
  );
  const chatbotLoading = useSelector(
    (state: RootState) => state.chatBotState.loading
  );

  const getSeverityLevel = (
    severity: string
  ): "low" | "medium" | "high" | "none" => {
    switch (severity) {
      case "low":
        return "low";
      case "medium":
        return "medium";
      case "high":
        return "high";
      case "none":
        return "none";
      default:
        return "none";
    }
  };

  const getSeverityColor = (severity: string) => {
    const level = getSeverityLevel(severity);
    switch (level) {
      case "low":
        return "success";
      case "medium":
        return "warning";
      case "high":
        return "error";
      default:
        return "info";
    }
  };

  const getSeverityIcon = (severity: string) => {
    const level = getSeverityLevel(severity);
    switch (level) {
      case "low":
        return <CheckCircle size={20} />;
      case "medium":
        return <AlertTriangle size={20} />;
      case "high":
        return <AlertTriangle size={20} />;
      default:
        return <Activity size={20} />;
    }
  };

  // Fetch chatbot recommendations when acne results are available
  useEffect(() => {
    if (!acneResults) return;

    const fetchRecommendations = async () => {
      try {
        dispatch(clearChatbotResponse());
        const message = `Tôi bị mụn với mức độ ${acneResults.severity.toLowerCase()}. Hãy đưa ra khuyến nghị điều trị phù hợp?`;
        await dispatch(fetchChatMessage(message));
      } catch (error) {
        console.error("Lỗi khi gọi chatbot:", error);
      }
    };

    fetchRecommendations();
  }, [acneResults, dispatch]);

  // Get acne ratio color based on percentage
  const getAcneRatioColor = (ratio: number) => {
    if (ratio < 5) return "success";
    if (ratio < 15) return "warning";
    return "error";
  };
  const severityMap: Record<"low" | "medium" | "high" | "none", string> = {
    low: "Nhẹ",
    medium: "Trung bình",
    high: "Nặng",
    none: "Không có mụn",
  };

  const severityText = acneResults
    ? severityMap[getSeverityLevel(acneResults.severity)]
    : "Chưa phân tích";

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: "100%",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
        Kết quả phân tích mụn
      </Typography>

      {!selectedImage ? (
        <Alert
          severity="info"
          icon={<Activity />}
          sx={{
            borderRadius: 2,
            backgroundColor: "info.50",
            border: "1px solid",
            borderColor: "info.200",
          }}
        >
          Vui lòng tải lên hình ảnh để bắt đầu phân tích mụn
        </Alert>
      ) : isAnalyzing || acneLoading ? (
        <Box>
          <Alert
            severity="info"
            icon={<Clock />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Đang phân tích hình ảnh và phát hiện mụn, vui lòng đợi...
          </Alert>
          <LinearProgress
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "grey.200",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center" }}
          >
            Đang xử lý và phát hiện các nốt mụn...
          </Typography>
        </Box>
      ) : acneError ? (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          Lỗi khi phân tích: {acneError}
        </Alert>
      ) : acneResults ? (
        <Box>
          {/* Analyzed Image Display */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: "primary.light",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 300,
                  overflow: "hidden",
                }}
              >
                <img
                  src={acneResults.imageUrl}
                  alt="Analyzed acne detection"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Eye size={14} />
                  <Typography variant="caption">Đã phân tích</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Main Results Card */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: `${getSeverityColor(acneResults.severity)}.light`,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${getSeverityColor(
                acneResults.severity
              )}.50 0%, white 100%)`,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h6" fontWeight={600}>
                  Mức độ: {severityText}
                </Typography>
                <Chip
                  icon={getSeverityIcon(acneResults.severity)}
                  label={`${acneResults.numAcne} nốt mụn`}
                  color={getSeverityColor(acneResults.severity) as any}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              {/* Statistics Grid */}
              <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                <Card elevation={1} sx={{ p: 2, textAlign: "center" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    mb={1}
                  >
                    <Target size={20} color="#1976d2" />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Số lượng mụn
                    </Typography>
                  </Box>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {acneResults.numAcne}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    nốt mụn được phát hiện
                  </Typography>
                </Card>

                <Card elevation={1} sx={{ p: 2, textAlign: "center" }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                    mb={1}
                  >
                    <TrendingUp size={20} color="#1976d2" />
                    <Typography variant="subtitle2" fontWeight={600}>
                      Diện tích mụn
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    color={getAcneRatioColor(acneResults.acneRatio)}
                    fontWeight={700}
                  >
                    {acneResults.acneRatio.toFixed(1)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    của tổng diện tích da mặt
                  </Typography>
                </Card>
              </Box>

              {/* Acne Ratio Progress Bar */}
              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Tỷ lệ diện tích mụn
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(acneResults.acneRatio, 100)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: `${getAcneRatioColor(
                        acneResults.acneRatio
                      )}.main`,
                      borderRadius: 5,
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {acneResults.acneRatio.toFixed(2)}% diện tích bị ảnh hưởng
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Accordion
            defaultExpanded
            sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}
          >
            <AccordionSummary
              expandIcon={<ChevronDown />}
              sx={{
                backgroundColor: "primary.50",
                borderRadius: "8px 8px 0 0",
                "&.Mui-expanded": {
                  borderRadius: "8px 8px 0 0",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} color="primary">
                Khuyến nghị điều trị
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "grey.50" }}>
              <Box>
                {chatbotLoading ? (
                  <Box display="flex" alignItems="center" gap={2} py={2}>
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">
                      Đang tải khuyến nghị điều trị từ AI...
                    </Typography>
                  </Box>
                ) : chatbotResponse ? (
                  <Box display="flex" alignItems="flex-start" mb={1}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "primary.main",
                        mt: 1,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {chatbotResponse}
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Skeleton variant="text" width="100%" height={20} />
                    <Skeleton variant="text" width="80%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Detailed Analysis */}
          <Accordion sx={{ borderRadius: 2, "&:before": { display: "none" } }}>
            <AccordionSummary
              expandIcon={<ChevronDown />}
              sx={{
                backgroundColor: "success.50",
                borderRadius: "8px 8px 0 0",
                "&.Mui-expanded": {
                  borderRadius: "8px 8px 0 0",
                },
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="success.dark"
              >
                Chi tiết phân tích
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "grey.50" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Kết quả phát hiện:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Phát hiện {acneResults.numAcne} nốt mụn trên da mặt
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Diện tích bị ảnh hưởng: {acneResults.acneRatio.toFixed(2)}
                    %
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Mức độ nghiêm trọng: {severityText}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    • Đã đánh dấu vị trí các nốt mụn trên hình ảnh
                  </Typography>
                </Box>

                <Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Đánh giá mức độ:
                  </Typography>
                  {acneResults.severity === "none" && (
                    <>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Không phát hiện nốt mụn nào trên da mặt
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Da mặt hiện tại không có dấu hiệu của mụn
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Bạn nên duy trì thói quen chăm sóc da để giữ tình
                        trạng này
                      </Typography>
                    </>
                  )}
                  {acneResults.severity === "low" && (
                    <>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Tình trạng mụn ở mức độ nhẹ, dễ điều trị
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Có thể sử dụng các sản phẩm chăm sóc da thông thường
                      </Typography>
                    </>
                  )}
                  {acneResults.severity === "medium" && (
                    <>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Tình trạng mụn ở mức độ trung bình
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Nên sử dụng sản phẩm chuyên dụng cho da mụn
                      </Typography>
                    </>
                  )}
                  {acneResults.severity === "high" && (
                    <>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Tình trạng mụn nghiêm trọng
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 0.5 }}>
                        • Cần tham khảo ý kiến bác sĩ da liễu
                      </Typography>
                    </>
                  )}
                </Box>

                <Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Theo dõi:
                  </Typography>
                  <Typography variant="body2">
                    {acneResults.severity === "high"
                      ? "Nên đến gặp bác sĩ da liễu trong vòng 1-2 tuần để được tư vấn điều trị chuyên sâu"
                      : "Theo dõi tình trạng da và chụp ảnh định kỳ để đánh giá hiệu quả điều trị"}
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          Chưa có kết quả phân tích. Vui lòng tải lên hình ảnh để bắt đầu.
        </Alert>
      )}
    </Paper>
  );
};

export default PredictionResults;
