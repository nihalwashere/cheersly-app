import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "../../components/TablePaginationActions";
import Spinner from "../../components/Spinner";
import {
  getAllUsersStatsSaga,
  setUsersPaginationConfig,
} from "./state/actions";

export default function Users() {
  const dispatch = useDispatch();

  const { isLoading, users, page, rowsPerPage, totalCount } = useSelector(
    (state: any) => state.users
  );

  const handleChangePage = (event: any, newPage: number) => {
    dispatch(setUsersPaginationConfig({ page: newPage }));
  };

  const handleChangeRowsPerPage = (event: any) => {
    dispatch(
      setUsersPaginationConfig({
        rowsPerPage: parseInt(
          typeof event.target.value === "object"
            ? totalCount
            : event.target.value,
          10
        ),
        page: 0,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAllUsersStatsSaga({
        pageIndex: Number(page),
        pageSize: Number(rowsPerPage),
      })
    );
  }, [page, rowsPerPage]);

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner loading={isLoading} />
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <TableContainer className="table mt-10">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <span className="text-base font-semibold">User</span>
                  </TableCell>
                  <TableCell align="right">
                    <span className="text-base font-semibold">
                      Reedemable points
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user: any) => (
                  <TableRow key={user?.user?.slackUserData?.id}>
                    <TableCell component="th" scope="row">
                      <div className="flex items-center">
                        <Avatar
                          alt=""
                          src={user?.user?.slackUserData?.profile?.image_24}
                          sx={{ width: 24, height: 24 }}
                        />{" "}
                        <span className="text-base ml-2">
                          {user?.user?.slackUserData?.profile?.real_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {user?.cheersRedeemable} points
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 30, 50, 100]}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
