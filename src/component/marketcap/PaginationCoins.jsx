import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const PaginationCoins = ({totalCoins,setcurrentPage,postPerPage}) => {
  const pageNumber=[];
  for (let i = 0; i < Math.ceil(totalCoins/postPerPage); i++) {
    pageNumber.push(i)
  }
  const handleOnclick=(event,value)=>{
    // console.log(value)
    setcurrentPage(value)
  }
  return (
    <div className="mt-2 d-flex align-items-center justify-content-center">
    <Stack spacing={2}>
    <Pagination count={pageNumber.length} onChange={handleOnclick} variant="outlined" color="warning"/>
  </Stack>
    </div>
    
  );
};

export default PaginationCoins;
