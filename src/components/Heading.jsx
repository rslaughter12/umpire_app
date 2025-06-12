import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';


export default function Heading() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <SportsBaseballIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Volo Umpire App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
