import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
export const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
      <Typography variant='h6'>Loading</Typography>
    </Box>
  )
}
