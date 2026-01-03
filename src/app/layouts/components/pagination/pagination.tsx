import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  Pagination as MuiPagination,
  PaginationItem,
  type PaginationProps,
  styled,
} from "@mui/material";

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.lighter,
  },
}));

export default function Pagination(props: PaginationProps) {
  return (
    <MuiPagination
      color="primary"
      renderItem={(item) => (
        <StyledPaginationItem
          className="text-xs font-semibold"
          slots={{ previous: ArrowLeft, next: ArrowRight }}
          {...item}
        />
      )}
      {...props}
    />
  );
}
