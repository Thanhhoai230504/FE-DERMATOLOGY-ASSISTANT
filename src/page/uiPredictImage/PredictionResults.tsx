// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Alert,
//   Box,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   LinearProgress,
//   Paper,
//   Typography,
// } from "@mui/material";
// import {
//   Activity,
//   AlertTriangle,
//   CheckCircle,
//   ChevronDown,
//   Clock,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearChatbotResponse,
//   fetchChatMessage,
// } from "../../store/slice/chatBotSlice";
// import { RootState } from "../../store/store";

// interface PredictionResult {
//   prediction: string;
//   confidence: number;
//   severity: "low" | "medium" | "high";
//   recommendations: string[];
//   details: {
//     findings: string[];
//     riskFactors: string[];
//     followUp: string;
//   };
// }

// interface PredictionResultsProps {
//   selectedImage: File | null;
//   isAnalyzing: boolean;
//   results?: PredictionResult | null;
// }

// const PredictionResults: React.FC<PredictionResultsProps> = ({
//   selectedImage,
//   isAnalyzing,
// }) => {
//   // const [recommendationText, setRecommendationText] = useState<string>("");
//   const dispatch = useDispatch<any>();
//   const results = useSelector(
//     (state: RootState) => state.predictImageState.result
//   );
//   const parsedConfidence = results?.confidence ?? 0;

//   const getSeverityLevel = (confidence: number): "low" | "medium" | "high" => {
//     if (confidence >= 80) return "low";
//     if (confidence >= 50) return "medium";
//     return "high";
//   };

//   const predictionMap: Record<string, string> = {
//     akiec:
//       "Tổn thương tiền ung thư do ánh nắng (Dày sừng quang hóa và Carcinoma tại chỗ)",
//     bcc: "Ung thư biểu mô tế bào đáy",
//     bkl: "Tổn thương giống dày sừng lành tính",
//     df: "U xơ da lành tính",
//     nv: "Nốt ruồi lành tính",
//     mel: "Ung thư hắc tố ác tính",
//     vasc: "Tổn thương mạch máu",
//   };
//   const getFullPredictionName = (code: string | undefined): string => {
//     if (!code) return "Chưa có kết quả phân tích";
//     return predictionMap[code.toLowerCase()] || code;
//   };
//   const response = useSelector(
//     (state: RootState) => state.chatBotState.response
//   );

//   useEffect(() => {
//     if (!results) return;

//     const fetchRecommendations = async () => {
//       try {
//         dispatch(clearChatbotResponse());
//         const fullName = getFullPredictionName(results.prediction);
//         await dispatch(
//           fetchChatMessage(`Khuyến nghị điều trị bệnh ${fullName}?`)
//         ).unwrap();
//         if (response) {
//           // setRecommendationText(response);
//         }

//         console.log("Chatbot response:", response);
//       } catch (error) {
//         console.error("Lỗi khi gọi chatbot:", error);
//       }
//     };

//     fetchRecommendations();
//   }, [results, dispatch]);
//   const chatbotLoading = useSelector(
//     (state: RootState) => state.chatBotState.loading
//   );
//   // useEffect(() => {
//   //   if (!results) return;

//   //   const fetchRecommendations = async () => {
//   //     try {
//   //       dispatch(clearChatbotResponse());
//   //       const fullName = getFullPredictionName(results.prediction);
//   //       await dispatch(
//   //         fetchChatMessage(`Khuyến nghị điều trị bệnh ${fullName}?`)
//   //       ).unwrap();
//   //     } catch (error) {
//   //       console.error("Lỗi khi gọi chatbot:", error);
//   //     }
//   //   };

//   //   fetchRecommendations();
//   // }, [results, dispatch]);

//   const mockResults: PredictionResult = {
//     prediction:
//       getFullPredictionName(results?.prediction) || "Chưa có kết quả phân tích",
//     confidence: parsedConfidence,
//     severity: getSeverityLevel(parsedConfidence),
//     recommendations: response ? [response] : [],
//     details: {
//       findings: [
//         "Cấu trúc phổi bình thường",
//         "Không có dấu hiệu viêm nhiễm",
//         "Tim có kích thước bình thường",
//         "Màng phổi không dày",
//       ],
//       riskFactors: ["Không phát hiện yếu tố nguy cơ"],
//       followUp: "Khám lại sau 6-12 tháng hoặc khi có triệu chứng bất thường",
//     },
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "low":
//         return "success";
//       case "medium":
//         return "warning";
//       case "high":
//         return "error";
//       default:
//         return "info";
//     }
//   };

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case "low":
//         return <CheckCircle size={20} />;
//       case "medium":
//         return <AlertTriangle size={20} />;
//       case "high":
//         return <AlertTriangle size={20} />;
//       default:
//         return <Activity size={20} />;
//     }
//   };

//   return (
//     <Paper
//       elevation={2}
//       sx={{
//         p: 3,
//         height: "100%",
//         background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
//         border: "1px solid",
//         borderColor: "grey.200",
//         borderRadius: 3,
//       }}
//     >
//       <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
//         Kết quả dự đoán
//       </Typography>

//       {!selectedImage ? (
//         <Alert
//           severity="info"
//           icon={<Activity />}
//           sx={{
//             borderRadius: 2,
//             backgroundColor: "info.50",
//             border: "1px solid",
//             borderColor: "info.200",
//           }}
//         >
//           Vui lòng tải lên hình ảnh để bắt đầu phân tích
//         </Alert>
//       ) : isAnalyzing ? (
//         <Box>
//           <Alert
//             severity="info"
//             icon={<Clock />}
//             sx={{ mb: 3, borderRadius: 2 }}
//           >
//             Đang phân tích hình ảnh, vui lòng đợi...
//           </Alert>
//           <LinearProgress
//             sx={{
//               height: 8,
//               borderRadius: 4,
//               backgroundColor: "grey.200",
//               "& .MuiLinearProgress-bar": {
//                 background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
//               },
//             }}
//           />
//           <Typography
//             variant="body2"
//             color="text.secondary"
//             sx={{ mt: 1, textAlign: "center" }}
//           >
//             Đang xử lý...
//           </Typography>
//         </Box>
//       ) : (
//         <Box>
//           {/* Main Result Card */}
//           <Card
//             elevation={0}
//             sx={{
//               mb: 3,
//               border: "2px solid",
//               borderColor: `${getSeverityColor(mockResults.severity)}.light`,
//               borderRadius: 3,
//               background: `linear-gradient(135deg, ${getSeverityColor(
//                 mockResults.severity
//               )}.50 0%, white 100%)`,
//             }}
//           >
//             <CardContent>
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 mb={2}
//               >
//                 <Typography variant="h6" fontWeight={600}>
//                   {mockResults.prediction}
//                 </Typography>
//                 <Chip
//                   icon={getSeverityIcon(mockResults.severity)}
//                   label={`${mockResults.confidence}% tin cậy`}
//                   color={getSeverityColor(mockResults.severity) as any}
//                   variant="filled"
//                   sx={{ fontWeight: 600 }}
//                 />
//               </Box>

//               <Box mb={2}>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   Độ tin cậy
//                 </Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={mockResults.confidence}
//                   sx={{
//                     height: 10,
//                     borderRadius: 5,
//                     backgroundColor: "grey.200",
//                     "& .MuiLinearProgress-bar": {
//                       backgroundColor: `${getSeverityColor(
//                         mockResults.severity
//                       )}.main`,
//                       borderRadius: 5,
//                     },
//                   }}
//                 />
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mt: 0.5 }}
//                 >
//                   {mockResults.confidence}%
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>

//           {/* Recommendations */}
//           <Accordion
//             defaultExpanded
//             sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}
//           >
//             <AccordionSummary
//               expandIcon={<ChevronDown />}
//               sx={{
//                 backgroundColor: "primary.50",
//                 borderRadius: "8px 8px 0 0",
//                 "&.Mui-expanded": {
//                   borderRadius: "8px 8px 0 0",
//                 },
//               }}
//             >
//               <Typography variant="subtitle1" fontWeight={600} color="primary">
//                 Khuyến nghị điều trị
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails sx={{ backgroundColor: "grey.50" }}>
//               <Box>
//                 {chatbotLoading && results ? (
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     py={2}
//                   >
//                     <LinearProgress
//                       sx={{
//                         width: "100%",
//                         height: 8,
//                         borderRadius: 4,
//                         backgroundColor: "grey.200",
//                         "& .MuiLinearProgress-bar": {
//                           background:
//                             "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
//                         },
//                       }}
//                     />
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{ mt: 1 }}
//                     >
//                       Đang tải khuyến nghị điều trị từ chatbot...
//                     </Typography>
//                   </Box>
//                 ) : (
//                   mockResults.recommendations.map((rec, index) => (
//                     <Box
//                       key={index}
//                       display="flex"
//                       alignItems="flex-start"
//                       mb={1}
//                     >
//                       <Box
//                         sx={{
//                           width: 6,
//                           height: 6,
//                           borderRadius: "50%",
//                           backgroundColor: "primary.main",
//                           mt: 1,
//                           mr: 2,
//                           flexShrink: 0,
//                         }}
//                       />
//                       <Typography variant="body2">{rec}</Typography>
//                     </Box>
//                   ))
//                 )}
//               </Box>
//             </AccordionDetails>
//           </Accordion>

//           {/* Detailed Analysis */}
//           <Accordion sx={{ borderRadius: 2, "&:before": { display: "none" } }}>
//             <AccordionSummary
//               expandIcon={<ChevronDown />}
//               sx={{
//                 backgroundColor: "success.50",
//                 borderRadius: "8px 8px 0 0",
//                 "&.Mui-expanded": {
//                   borderRadius: "8px 8px 0 0",
//                 },
//               }}
//             >
//               <Typography
//                 variant="subtitle1"
//                 fontWeight={600}
//                 color="success.dark"
//               >
//                 Chi tiết phân tích
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails sx={{ backgroundColor: "grey.50" }}>
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 <Box>
//                   <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                     Các phát hiện chính:
//                   </Typography>
//                   {mockResults.details.findings.map((finding, index) => (
//                     <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
//                       • {finding}
//                     </Typography>
//                   ))}
//                 </Box>

//                 <Box>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                     Yếu tố nguy cơ:
//                   </Typography>
//                   {mockResults.details.riskFactors.map((risk, index) => (
//                     <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
//                       • {risk}
//                     </Typography>
//                   ))}
//                 </Box>

//                 <Box>
//                   <Divider sx={{ my: 2 }} />
//                   <Typography variant="subtitle2" fontWeight={600} gutterBottom>
//                     Theo dõi:
//                   </Typography>
//                   <Typography variant="body2">
//                     {mockResults.details.followUp}
//                   </Typography>
//                 </Box>
//               </Box>
//             </AccordionDetails>
//           </Accordion>
//         </Box>
//       )}
//     </Paper>
//   );
// };

// export default PredictionResults;

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
} from "@mui/material";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Clock,
} from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearChatbotResponse,
  fetchChatMessage,
} from "../../store/slice/chatBotSlice";
import { RootState } from "../../store/store";

interface PredictionResult {
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

interface PredictionResultsProps {
  selectedImage: File | null;
  isAnalyzing: boolean;
  results?: PredictionResult | null;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({
  selectedImage,
  isAnalyzing,
}) => {
  const dispatch = useDispatch<any>();
  const results = useSelector(
    (state: RootState) => state.predictImageState.result
  );
  const parsedConfidence = results?.confidence ?? 0;

  const getSeverityLevel = (confidence: number): "low" | "medium" | "high" => {
    if (confidence >= 80) return "low";
    if (confidence >= 50) return "medium";
    return "high";
  };

  const predictionMap: Record<string, string> = {
    akiec:
      "Tổn thương tiền ung thư do ánh nắng (Dày sừng quang hóa và Carcinoma tại chỗ)",
    bcc: "Ung thư biểu mô tế bào đáy",
    bkl: "Tổn thương giống dày sừng lành tính",
    df: "U xơ da lành tính",
    nv: "Nốt ruồi lành tính",
    mel: "Ung thư hắc tố ác tính",
    vasc: "Tổn thương mạch máu",
  };
  const getFullPredictionName = (code: string | undefined): string => {
    if (!code) return "Chưa có kết quả phân tích";
    return predictionMap[code.toLowerCase()] || code;
  };
  const response = useSelector(
    (state: RootState) => state.chatBotState.response
  );

  useEffect(() => {
    if (!results) return;

    const fetchRecommendations = async () => {
      try {
        dispatch(clearChatbotResponse());
        const fullName = getFullPredictionName(results.prediction);
        await dispatch(
          fetchChatMessage(`Khuyến nghị điều trị bệnh ${fullName}?`)
        );
        console.log("Chatbot response:", response);
      } catch (error) {
        console.error("Lỗi khi gọi chatbot:", error);
      }
    };

    fetchRecommendations();
  }, [results, dispatch]);
  const chatbotLoading = useSelector(
    (state: RootState) => state.chatBotState.loading
  );

  const mockResults: PredictionResult = {
    prediction:
      getFullPredictionName(results?.prediction) || "Chưa có kết quả phân tích",
    confidence: parsedConfidence,
    severity: getSeverityLevel(parsedConfidence),
    recommendations: response ? [response] : [],
    details: {
      findings: [
        // "Cấu trúc phổi bình thường",
        // "Không có dấu hiệu viêm nhiễm",
        // "Tim có kích thước bình thường",
        // "Màng phổi không dày",
      ],
      riskFactors: ["Không phát hiện yếu tố nguy cơ"],
      followUp: "Khám lại sau 6-12 tháng hoặc khi có triệu chứng bất thường",
    },
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
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
    switch (severity) {
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
        Kết quả dự đoán
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
          Vui lòng tải lên hình ảnh để bắt đầu phân tích
        </Alert>
      ) : isAnalyzing ? (
        <Box>
          <Alert
            severity="info"
            icon={<Clock />}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            Đang phân tích hình ảnh, vui lòng đợi...
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
            Đang xử lý...
          </Typography>
        </Box>
      ) : (
        <Box>
          {/* Main Result Card */}
          <Card
            elevation={0}
            sx={{
              mb: 3,
              border: "2px solid",
              borderColor: `${getSeverityColor(mockResults.severity)}.light`,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${getSeverityColor(
                mockResults.severity
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
                  {mockResults.prediction}
                </Typography>
                <Chip
                  icon={getSeverityIcon(mockResults.severity)}
                  label={`${mockResults.confidence}% tin cậy`}
                  color={getSeverityColor(mockResults.severity) as any}
                  variant="filled"
                  sx={{ fontWeight: 600 }}
                />
              </Box>

              <Box mb={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Độ tin cậy
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={mockResults.confidence}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "grey.200",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: `${getSeverityColor(
                        mockResults.severity
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
                  {mockResults.confidence}%
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
                {chatbotLoading && results ? (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={2}
                  >
                    <LinearProgress
                      sx={{
                        width: "100%",
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                          background:
                            "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Đang tải khuyến nghị điều trị từ chatbot...
                    </Typography>
                  </Box>
                ) : (
                  mockResults.recommendations.map((rec, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="flex-start"
                      mb={1}
                    >
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
                      <Typography variant="body2">{rec}</Typography>
                    </Box>
                  ))
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
                    Các phát hiện chính:
                  </Typography>
                  {mockResults.details.findings.map((finding, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                      • {finding}
                    </Typography>
                  ))}
                </Box>

                <Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Yếu tố nguy cơ:
                  </Typography>
                  {mockResults.details.riskFactors.map((risk, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                      • {risk}
                    </Typography>
                  ))}
                </Box>

                <Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Theo dõi:
                  </Typography>
                  <Typography variant="body2">
                    {mockResults.details.followUp}
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </Paper>
  );
};

export default PredictionResults;
