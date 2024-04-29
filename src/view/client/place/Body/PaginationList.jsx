import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onPageChange}
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;