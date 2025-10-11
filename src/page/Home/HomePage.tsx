import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
  Chip,
  Fade,
  Slide,
  Zoom,
  Grow,
  useTheme,
  useMediaQuery,
  Divider,
  Fab,
} from "@mui/material";
import { ThemeProvider, createTheme, keyframes } from "@mui/material/styles";
import {
  Heart,
  Stethoscope,
  Brain,
  Eye,
  Activity,
  Users,
  Award,
  Clock,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  Camera,
  Scan,
  Bot,
  Zap,
  Target,
  Globe,
} from "lucide-react";

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
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 12,
          fontWeight: 600,
          padding: "12px 24px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        },
      },
    },
  },
});

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const slideInLeft = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    // Animate cards one by one
    const timer = setTimeout(() => {
      setVisibleCards([0]);
      setTimeout(() => setVisibleCards([0, 1]), 200);
      setTimeout(() => setVisibleCards([0, 1, 2]), 400);
      setTimeout(() => setVisibleCards([0, 1, 2, 3]), 600);
      setTimeout(() => setStatsVisible(true), 800);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Scan size={40} />,
      title: "Phân tích hình ảnh y tế",
      description:
        "AI thông minh phân tích X-ray, CT scan và các hình ảnh y tế khác để hỗ trợ chẩn đoán nhanh chóng và chính xác.",
      color: "primary",
      gradient: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      action: () => navigate("/predictdisease"),
      buttonText: "Bắt đầu phân tích",
      stats: "99.2% độ chính xác",
    },
    {
      icon: <Target size={40} />,
      title: "Phát hiện mụn thông minh",
      description:
        "Công nghệ AI tiên tiến phân tích da mặt, phát hiện và phân loại các loại mụn, đưa ra khuyến nghị điều trị phù hợp.",
      color: "success",
      gradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
      action: () => navigate("/detectance"),
      buttonText: "Phân tích da mặt",
      stats: "10,000+ ca phân tích",
    },
    {
      icon: <Bot size={40} />,
      title: "AI Doctor Assistant",
      description:
        "Trợ lý AI y tế 24/7 sẵn sàng tư vấn, giải đáp thắc mắc về sức khỏe và hướng dẫn chăm sóc ban đầu.",
      color: "secondary",
      gradient: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
      action: () => navigate("/chatBot"),
      buttonText: "Tư vấn ngay",
      stats: "24/7 hỗ trợ",
    },
    {
      icon: <Shield size={40} />,
      title: "Bảo mật tuyệt đối",
      description:
        "Dữ liệu y tế được mã hóa và bảo vệ theo tiêu chuẩn quốc tế, đảm bảo quyền riêng tư tuyệt đối của bệnh nhân.",
      color: "warning",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      action: () => console.log("Security info"),
      buttonText: "Tìm hiểu thêm",
      stats: "ISO 27001 certified",
    },
  ];

  const stats = [
    {
      icon: <Users size={24} />,
      value: "50,000+",
      label: "Bệnh nhân tin tưởng",
    },
    { icon: <Award size={24} />, value: "99.2%", label: "Độ chính xác AI" },
    { icon: <Clock size={24} />, value: "24/7", label: "Hỗ trợ liên tục" },
    { icon: <Globe size={24} />, value: "100+", label: "Bệnh viện đối tác" },
  ];

  const testimonials = [
    {
      name: "BS. Nguyễn Thanh Hoài",
      role: "Trưởng khoa Da liễu",
      avatar: "👨‍⚕️",
      text: "Hệ thống AI này đã giúp chúng tôi chẩn đoán nhanh chóng và chính xác hơn rất nhiều.",
      rating: 5,
    },
    {
      name: "BS. Nguyễn Thanh Hoài",
      role: "Bác sĩ X-quang",
      avatar: "👩‍⚕️",
      text: "Công nghệ tuyệt vời! Tiết kiệm thời gian và nâng cao chất lượng chẩn đoán.",
      rating: 5,
    },
    {
      name: "Nguyễn Minh Quân",
      role: "Bệnh nhân",
      avatar: "👤",
      text: "Rất hài lòng với dịch vụ. Kết quả nhanh chóng và chính xác.",
      rating: 5,
    },
  ];

  return (
    <ThemeProvider theme={medicalTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)",
          overflow: "hidden",
        }}
      >
        {/* Hero Section */}
        <Container maxWidth="xl" sx={{ pt: 8, pb: 6 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Fade in timeout={1000}>
                <Box>
                  <Chip
                    icon={<Sparkles size={16} />}
                    label="Công nghệ AI tiên tiến"
                    sx={{
                      mb: 3,
                      background:
                        "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                      color: "white",
                      fontWeight: 600,
                      animation: `${pulse} 2s infinite`,
                    }}
                  />
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
                      background:
                        "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 3,
                      animation: `${slideInLeft} 1s ease-out`,
                    }}
                  >
                    Hệ thống Y tế
                    <br />
                    <Box
                      component="span"
                      sx={{
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Thông minh AI
                    </Box>
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      mb: 4,
                      lineHeight: 1.6,
                      animation: `${slideInLeft} 1s ease-out 0.2s both`,
                    }}
                  >
                    Ứng dụng trí tuệ nhân tạo tiên tiến trong chẩn đoán y tế,
                    mang đến độ chính xác cao và tốc độ xử lý nhanh chóng
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: { xs: "column", sm: "row" },
                      animation: `${slideInLeft} 1s ease-out 0.4s both`,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Zap size={20} />}
                      onClick={() => navigate("/predictdisease")}
                      sx={{
                        background:
                          "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                        px: 4,
                        py: 2,
                        fontSize: "1.1rem",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Bắt đầu phân tích
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<MessageCircle size={20} />}
                      onClick={() => navigate("/detectance")}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: "1.1rem",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Phân tích da mặt
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  animation: `${slideInRight} 1s ease-out`,
                }}
              >
                {/* Floating elements */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    animation: `${float} 3s ease-in-out infinite`,
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                      color: "white",
                    }}
                  >
                    <Heart size={24} />
                  </Paper>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "20%",
                    right: "15%",
                    animation: `${float} 3s ease-in-out infinite 1s`,
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                      color: "white",
                    }}
                  >
                    <Brain size={24} />
                  </Paper>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "20%",
                    animation: `${float} 3s ease-in-out infinite 2s`,
                  }}
                >
                  <Paper
                    elevation={8}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      background:
                        "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "white",
                    }}
                  >
                    <Activity size={24} />
                  </Paper>
                </Box>

                {/* Main illustration */}
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: `${pulse} 4s ease-in-out infinite`,
                    boxShadow: "0 20px 60px rgba(37, 99, 235, 0.3)",
                  }}
                >
                  <Stethoscope size={120} color="white" />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Stats Section */}
        <Container maxWidth="xl" sx={{ py: 6 }}>
          <Fade in={statsVisible} timeout={1000}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 4,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Grid container spacing={4}>
                {stats.map((stat, index) => (
                  <Grid size={{ xs: 12, md: 4 }} key={index}>
                    <Grow in={statsVisible} timeout={1000 + index * 200}>
                      <Box textAlign="center">
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                            color: "white",
                            animation: `${rotate} 10s linear infinite`,
                          }}
                        >
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          fontWeight={700}
                          color="primary"
                          gutterBottom
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
        </Container>

        {/* Features Section */}
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 2,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tính năng nổi bật
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Khám phá các công nghệ AI tiên tiến được tích hợp trong hệ thống y
              tế của chúng tôi
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Zoom
                  in={visibleCards.includes(index)}
                  timeout={500 + index * 200}
                >
                  <Card
                    sx={{
                      height: "100%",
                      position: "relative",
                      overflow: "visible",
                      "&:hover": {
                        "& .feature-icon": {
                          transform: "scale(1.1) rotate(5deg)",
                        },
                        "& .feature-button": {
                          transform: "translateX(5px)",
                        },
                      },
                    }}
                  >
                    <Box
                      className="feature-icon"
                      sx={{
                        position: "absolute",
                        top: -20,
                        left: 30,
                        width: 80,
                        height: 80,
                        borderRadius: 3,
                        background: feature.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        transition: "all 0.3s ease",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <CardContent sx={{ pt: 5, pb: 3 }}>
                      <Box sx={{ ml: 12 }}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 3, lineHeight: 1.6 }}
                        >
                          {feature.description}
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Chip
                            label={feature.stats}
                            size="small"
                            sx={{
                              background: `${feature.color}.50`,
                              color: `${feature.color}.dark`,
                              fontWeight: 600,
                            }}
                          />
                          <Button
                            className="feature-button"
                            variant="contained"
                            endIcon={<ArrowRight size={16} />}
                            onClick={feature.action}
                            sx={{
                              background: feature.gradient,
                              transition: "all 0.3s ease",
                              "&:hover": {
                                background: feature.gradient,
                                boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                              },
                            }}
                          >
                            {feature.buttonText}
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Testimonials Section */}
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 2,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Đánh giá từ chuyên gia
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Những phản hồi tích cực từ các bác sĩ và bệnh nhân
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Slide in direction="up" timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: "100%",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            fontSize: "1.5rem",
                            mr: 2,
                          }}
                        >
                          {testimonial.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ mb: 2, fontStyle: "italic", lineHeight: 1.6 }}
                      >
                        "{testimonial.text}"
                      </Typography>
                      <Box display="flex" gap={0.5}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill="#fbbf24"
                            color="#fbbf24"
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              background: "linear-gradient(135deg, #2563eb 0%, #dc2626 100%)",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                animation: `${float} 6s ease-in-out infinite`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                animation: `${float} 4s ease-in-out infinite 2s`,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h3" fontWeight={700} gutterBottom>
                Sẵn sàng trải nghiệm?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Bắt đầu sử dụng hệ thống AI y tế thông minh ngay hôm nay
              </Typography>
              <Box
                display="flex"
                gap={2}
                justifyContent="center"
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Scan size={20} />}
                  onClick={() => navigate("/predictdisease")}
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    px: 4,
                    py: 2,
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Phân tích hình ảnh y tế
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Target size={20} />}
                  onClick={() => navigate("/detectance")}
                  sx={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    px: 4,
                    py: 2,
                    "&:hover": {
                      background: "rgba(255,255,255,0.3)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Phát hiện mụn thông minh
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            color: "white",
            py: 6,
            mt: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Heart size={32} color="#dc2626" />
                  <Typography variant="h5" fontWeight={700} sx={{ ml: 2 }}>
                    MedicalAI
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.8, lineHeight: 1.6 }}
                >
                  Hệ thống y tế thông minh sử dụng AI tiên tiến để hỗ trợ chẩn
                  đoán và chăm sóc sức khỏe tốt nhất cho mọi người.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box textAlign={{ xs: "left", md: "right" }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Liên hệ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Email: nguyenthanhhoai230504@gmail.com
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Hotline: 039 472 7005
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Địa chỉ: 38 Bùi vịnh, Cẩm Lệ , Đà Nẵng
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />
            <Box textAlign="center">
              <Typography variant="body2" sx={{ opacity: 0.6 }}>
                © 2025 MedicalAI. Tất cả quyền được bảo lưu.
              </Typography>
            </Box>
          </Container>
        </Box>
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

export default HomePage;
