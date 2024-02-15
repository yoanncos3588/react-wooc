import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";

export interface PropsPaginationBasic {
  currentPage: string;
  setCurrentPage?: React.Dispatch<React.SetStateAction<string>>;
  totalPages: string;
}

const PaginationBasic = ({ currentPage, setCurrentPage, totalPages }: PropsPaginationBasic) => {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * handle click on pagination item, if no setCurrentPage defined add search params to url
   * @param e event triggered on pagination changed
   * @param value clicked page value
   */
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    if (setCurrentPage) {
      setCurrentPage(String(value));
    } else {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", String(value));
      navigate({ search: `?${searchParams.toString()}` });
    }
  };

  return (
    <Stack spacing={2} alignItems={"center"}>
      <Pagination count={Number(totalPages)} page={Number(currentPage)} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationBasic;
