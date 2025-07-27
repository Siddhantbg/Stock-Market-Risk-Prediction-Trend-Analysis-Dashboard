import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Send } from '@mui/icons-material';

interface PredictionFormProps {
  onPredict: (features: number[]) => void;
  loading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, loading }) => {
  const [open, setOpen] = useState<string>('');
  const [close, setClose] = useState<string>('');
  const [volume, setVolume] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const openNum = parseFloat(open);
    const closeNum = parseFloat(close);
    const volumeNum = parseFloat(volume);

    if (isNaN(openNum) || isNaN(closeNum) || isNaN(volumeNum)) {
      setError('Please enter valid numbers for all fields');
      return;
    }

    if (openNum <= 0 || closeNum <= 0 || volumeNum <= 0) {
      setError('All values must be positive');
      return;
    }

    onPredict([openNum, closeNum, volumeNum]);
    
    // Clear form
    setOpen('');
    setClose('');
    setVolume('');
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Risk Prediction
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Open Price"
          value={open}
          onChange={(e) => setOpen(e.target.value)}
          type="number"
          inputProps={{ step: '0.01', min: '0' }}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Close Price"
          value={close}
          onChange={(e) => setClose(e.target.value)}
          type="number"
          inputProps={{ step: '0.01', min: '0' }}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Volume"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          type="number"
          inputProps={{ step: '1', min: '0' }}
          margin="normal"
          required
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Send />}
        >
          {loading ? 'Predicting...' : 'Predict Risk'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PredictionForm;
