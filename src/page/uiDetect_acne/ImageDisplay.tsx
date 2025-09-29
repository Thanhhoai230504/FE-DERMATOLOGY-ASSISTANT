import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Skeleton,
  Fade,
} from '@mui/material';
import { Image as ImageIcon } from 'lucide-react';

interface ImageDisplayProps {
  selectedImage: File | null;
  isAnalyzing?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ selectedImage, isAnalyzing }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
    }
  }, [selectedImage]);

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom fontWeight={600}>
        Hình ảnh hiển thị
      </Typography>
      
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          border: '2px dashed',
          borderColor: selectedImage ? 'success.light' : 'grey.300',
          borderRadius: 2,
          p: 2,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isAnalyzing ? (
          <Box sx={{ width: '100%', height: 300 }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
            <Typography
              variant="body2"
              color="primary"
              sx={{ mt: 2, textAlign: 'center' }}
            >
              Đang phân tích hình ảnh...
            </Typography>
          </Box>
        ) : imageUrl ? (
          <Fade in>
            <Box
              component="img"
              src={imageUrl}
              alt="Medical image"
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Fade>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            color="grey.400"
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <ImageIcon size={50} />
            </Box>
            <Typography variant="body1" color="text.secondary">
              Chưa có hình ảnh nào được chọn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vui lòng tải lên hình ảnh để hiển thị
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ImageDisplay;