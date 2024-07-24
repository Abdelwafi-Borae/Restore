import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../Models/Pagination";
interface props {
  MetaData: MetaData;
  onpagechange: (page: number) => void;
}
function AppPagination({ onpagechange, MetaData }: props) {
  const { pageSize, currentPage, totalCount, totalPages } = MetaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        display{(currentPage - 1) * pageSize + 1} -
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}
        {`  out of      ${MetaData?.totalCount}`}
      </Typography>
      <Pagination
        count={Number(totalPages)}
        color="secondary"
        size="large"
        page={Number(currentPage)}
        onChange={(e, page) => onpagechange(page)}
      />
    </Box>
  );
}

export default AppPagination;
