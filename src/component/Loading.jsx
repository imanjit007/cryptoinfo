import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
const Loading = () => {
  return (
    <>
    <div className='d-flex align-items-center justify-content-center'>
    <Box sx={{ width: '100%' }}>
      <LinearProgress color="warning" />
    </Box>
    </div>
    <div className='pt-5 d-flex align-items-center justify-content-center'>
    <div className="loader">
    <div className="loader-circle"></div>
    <span className="loader-text">Loading...</span>
 </div>
    </div>
    </>
  )
}

export default Loading