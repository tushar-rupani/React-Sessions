import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

export const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}><Link to="/users">Users</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to="/posts">Add Post</Link></Typography>
        <Typography sx={{ minWidth: 100 }}><Link to="/validation">Validation Form</Link></Typography>
      </Box>
    </>
  );
}