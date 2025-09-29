import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Fade,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AlertCircle,
  Bot,
  CheckCircle,
  Heart,
  Info,
  MessageCircle,
  Send,
  Stethoscope,
  User,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchChatMessage } from "../../store/slice/chatBotSlice";

const medicalTheme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#dc2626",
      light: "#f87171",
      dark: "#b91c1c",
    },
    success: {
      main: "#16a34a",
      light: "#4ade80",
      dark: "#15803d",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
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
          borderRadius: 12,
        },
      },
    },
  },
});

interface Message {
  id: string;
  text: string;
  answer?: any;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion" | "warning" | "info";
}

const MedicalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi là AI Assistant Y tế. Tôi có thể giúp bạn tư vấn về sức khỏe, triệu chứng và các vấn đề y tế cơ bản. Bạn có thể hỏi tôi bất cứ điều gì!",
      sender: "bot",
      timestamp: new Date(),
      type: "info",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const quickSuggestions = [
    "Làm sao để nhận biết nốt ruồi có dấu hiệu bất thường?",
    "Có nên nặn mụn nhẹ tại nhà không?",
    "U hắc tố (melanoma) nguy hiểm như thế nào và khi nào cần đi khám?",
    "Những thực phẩm giúp cải thiện sức khỏe làn da?",
    "Vi khuẩn P. acnes ảnh hưởng đến mụn như thế nào?",
    "Thói quen sinh hoạt nào có thể góp phần gây mụn mức độ nhẹ?",
    "Kiểm tra da định kỳ có cần thiết không?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await dispatch(fetchChatMessage(inputMessage)).unwrap();
      const botMessage: Message = {
        id: Date.now().toString(),
        text: response || "Xin lỗi, tôi không thể trả lời câu hỏi này.",
        sender: "bot",
        timestamp: new Date(),
        type: "info",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Đã xảy ra lỗi khi gửi câu hỏi. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date(),
        type: "warning",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "warning":
        return <AlertCircle size={16} />;
      case "suggestion":
        return <CheckCircle size={16} />;
      case "info":
        return <Info size={16} />;
      default:
        return <MessageCircle size={16} />;
    }
  };

  const getMessageColor = (type?: string) => {
    switch (type) {
      case "warning":
        return "warning";
      case "suggestion":
        return "success";
      case "info":
        return "info";
      default:
        return "primary";
    }
  };

  return (
    <ThemeProvider theme={medicalTheme}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            borderRadius: 0,
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
                background: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
              }}
            >
              <Bot size={28} />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>
                AI Doctor Assistant
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                  }}
                />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Trực tuyến - Sẵn sàng hỗ trợ
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Chip
                icon={<Heart size={16} />}
                label="Y tế"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "& .MuiChip-icon": { color: "white" },
                }}
              />
              <Chip
                icon={<Stethoscope size={16} />}
                label="Tư vấn"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "& .MuiChip-icon": { color: "white" },
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Slide
              key={message.id}
              direction={message.sender === "user" ? "left" : "right"}
              in={true}
              timeout={300 + index * 100}
            >
              <Box
                display="flex"
                justifyContent={
                  message.sender === "user" ? "flex-end" : "flex-start"
                }
                alignItems="flex-start"
                gap={2}
              >
                {message.sender === "bot" && (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    }}
                  >
                    <Bot size={20} />
                  </Avatar>
                )}

                <Card
                  elevation={2}
                  sx={{
                    maxWidth: "70%",
                    background:
                      message.sender === "user"
                        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                        : "white",
                    color: message.sender === "user" ? "white" : "text.primary",
                    borderRadius: 3,
                    border:
                      message.sender === "bot" ? "1px solid #e2e8f0" : "none",
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    {message.sender === "bot" && message.type && (
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <Chip
                          icon={getMessageIcon(message.type)}
                          label={
                            message.type === "warning"
                              ? "Lưu ý"
                              : message.type === "suggestion"
                              ? "Gợi ý"
                              : "Thông tin"
                          }
                          size="small"
                          color={getMessageColor(message.type) as any}
                          variant="outlined"
                        />
                      </Box>
                    )}
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {message.text}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        display: "block",
                        opacity: 0.7,
                      }}
                    >
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </CardContent>
                </Card>

                {message.sender === "user" && (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      background:
                        "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    }}
                  >
                    <User size={20} />
                  </Avatar>
                )}
              </Box>
            </Slide>
          ))}

          {isTyping && (
            <Fade in>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                  }}
                >
                  <Bot size={20} />
                </Avatar>
                <Card elevation={2} sx={{ p: 2, borderRadius: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI đang suy nghĩ...
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Fade>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Quick Suggestions */}
        {messages.length <= 1 && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Gợi ý câu hỏi:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {quickSuggestions.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "primary.light",
                      color: "white",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Divider />

        {/* Input Area */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            background: "white",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <Box display="flex" gap={2} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Nhập câu hỏi về sức khỏe của bạn..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  backgroundColor: "#f8fafc",
                },
              }}
            />
            <IconButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                },
                "&:disabled": {
                  background: "#e2e8f0",
                  color: "#94a3b8",
                },
              }}
            >
              <Send size={20} />
            </IconButton>
          </Box>

          {/* Disclaimer */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 1,
              display: "block",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            ⚠️ Thông tin chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến
            bác sĩ chuyên khoa.
          </Typography>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default MedicalChatbot;
