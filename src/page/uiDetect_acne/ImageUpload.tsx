import {
  Alert,
  Box,
  Button,
  Fade,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Image as ImageIcon, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { clearChatbotResponse } from "../../store/slice/chatBotSlice";
import { clearDetectAnce } from "../../store/slice/detectAnceSlice";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputKey, setInputKey] = useState(0);
  const dispatch = useDispatch<any>();
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    setUploadError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn file hình ảnh hợp lệ");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Kích thước file không được vượt quá 10MB");
      return;
    }

    onImageSelect(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleRemoveImage = () => {
    onImageSelect(null as any);
    setInputKey((prev) => prev + 1); // buộc reset input file
    dispatch(clearDetectAnce());
    dispatch(clearChatbotResponse());
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        border: "2px dashed",
        borderColor: dragOver ? "primary.main" : "grey.300",
        borderRadius: 3,
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "primary.light",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        },
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight={200}
        textAlign="center"
      >
        {!selectedImage ? (
          <>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "primary.light",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              <Upload size={40} color="white" />
            </Box>
            <Typography
              variant="h6"
              color="primary"
              gutterBottom
              fontWeight={600}
            >
              Tải lên hình ảnh y tế
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Kéo thả file vào đây hoặc nhấn để chọn file
            </Typography>
            <Button
              variant="contained"
              startIcon={<ImageIcon size={20} />}
              onClick={() => fileInputRef.current?.click()}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
                },
              }}
            >
              Chọn hình ảnh
            </Button>
          </>
        ) : (
          <Fade in>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 2,
                  backgroundColor: "success.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ImageIcon size={30} color="white" />
              </Box>
              <Box flex={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="success.main"
                >
                  {selectedImage.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </Box>
              <IconButton
                onClick={handleRemoveImage}
                sx={{
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "error.light",
                    color: "white",
                  },
                }}
              >
                <X size={20} />
              </IconButton>
            </Box>
          </Fade>
        )}
      </Box>

      {uploadError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {uploadError}
        </Alert>
      )}

      <input
        key={inputKey}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: "none" }}
        title="Chọn ảnh từ thiết bị"
      />
    </Paper>
  );
};

export default ImageUpload;
