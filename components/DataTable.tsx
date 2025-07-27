import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Tabs,
  Tab,
  TablePagination,
} from '@mui/material';

interface StockData {
  date: string;
  open: number;
  close: number;
  volume: number;
}

interface Prediction {
  id: number;
  features: number[];
  prediction: number;
  timestamp: string;
}

interface DataTableProps {
  stockData: StockData[];
  predictions: Prediction[];
}

const DataTable: React.FC<DataTableProps> = ({ stockData, predictions }) => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const stockDataSlice = stockData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const predictionsSlice = predictions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Data Overview
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Stock Data" />
          <Tab label="Predictions" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="right">Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockDataSlice.map((row, index) => {
                  const change = ((row.close - row.open) / row.open * 100);
                  return (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">${row.open.toFixed(2)}</TableCell>
                      <TableCell align="right">${row.close.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.volume.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${change >= 0 ? '+' : ''}${change.toFixed(2)}%`}
                          color={change >= 0 ? 'success' : 'error'}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={stockData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">Close</TableCell>
                  <TableCell align="right">Volume</TableCell>
                  <TableCell align="center">Risk Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {predictionsSlice.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {new Date(row.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell align="right">${row.features[0]?.toFixed(2) || 'N/A'}</TableCell>
                    <TableCell align="right">${row.features[1]?.toFixed(2) || 'N/A'}</TableCell>
                    <TableCell align="right">{row.features[2]?.toLocaleString() || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={row.prediction === 1 ? 'High Risk' : 'Low Risk'}
                        color={row.prediction === 1 ? 'error' : 'success'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={predictions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DataTable;
