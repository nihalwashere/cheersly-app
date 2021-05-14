import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import TablePaginationActions from "../../components/TablePaginationActions";
import Spinner from "../../components/Spinner";
import {
  getAdminSettingsListSagaAction,
  setAdminSettingsList,
  switchAdminSagaAction,
} from "./state/actions";
import "./styles.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ff7f50",
    color: theme.palette.common.white,
    fontSize: 18,
    fontFamily: "Product Sans",
  },
  body: {
    fontSize: 16,
    fontFamily: "Product Sans",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const AdminSettingsContainer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { adminSettings, isLoading } = useSelector(
    (state) => state.adminSettings
  );

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSwitchAdmin = (event, userId) => {
    dispatch(
      switchAdminSagaAction({
        userId,
        isAdmin: event.target.checked,
        pageIndex: page,
        pageSize: rowsPerPage,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getAdminSettingsListSagaAction({
        pageIndex: page,
        pageSize: rowsPerPage,
      })
    );
  }, [page, rowsPerPage]);

  return (
    <div className="admin-settings-root-container">
      <div className="admin-settings-container">
        {isLoading ? (
          <div className="admin-settings-spinner">
            <Spinner />
          </div>
        ) : (
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">User</StyledTableCell>
                    <StyledTableCell align="right">Admin</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminSettings.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        <div className="admin-name-container">
                          <Avatar
                            alt=""
                            src={row.slackUserData.profile.image_192}
                          />
                          <div className="admin-name">
                            <span>{row.slackUserData.real_name}</span>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <span className="admin-status">
                          <Switch
                            checked={row.isAdmin}
                            onChange={(event) =>
                              handleSwitchAdmin(event, row.slackUserData.id)
                            }
                          />
                        </span>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>

                <TableFooter>
                  <StyledTableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        10,
                        20,
                        30,
                        { label: "All", value: -1 },
                      ]}
                      count={adminSettings.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { "aria-label": "rows per page" },
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </StyledTableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettingsContainer;
