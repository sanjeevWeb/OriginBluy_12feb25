import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography } from '@mui/material'
import {PhotoCamera} from '@mui/icons-material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const Layout = () => {
  return (
    <div>
    <CssBaseline></CssBaseline>

      <AppBar position="relative">
        <Toolbar>
        <DriveFolderUploadIcon className='mx-2.5'/>
          <Typography variant="h6">
            File Uploader
          </Typography>
        </Toolbar>
      </AppBar>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
