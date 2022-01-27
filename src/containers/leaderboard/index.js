import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import TablePaginationActions from "../../components/TablePaginationActions";
import Spinner from "../../components/Spinner";
import { getLeaderBoardListSagaAction } from "./state/actions";
import { TYPES, DURATION } from "../../enums/leaderBoardFilters";
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

const LeaderboardContainer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [type, setType] = useState(TYPES[0].value);

  const handleType = (event) => {
    setType(event.target.value);
  };

  const [duration, setDuration] = useState(DURATION[0].value);

  const handleDuration = (event) => {
    setDuration(event.target.value);
  };

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getLeaderBoardListSagaAction({
        pageIndex: page + 1,
        pageSize: rowsPerPage,
        type,
        duration,
      })
    );
  }, [type, duration, page, rowsPerPage]);

  const { leaderBoard, isLoading } = useSelector((state) => state.leaderboard);

  return (
    <div className="leaderboard-root-container">
      <div className="leaderboard-container">
        {isLoading ? (
          <div className="leaderboard-spinner">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="leaderboard-filters-container">
              <div>
                <FormControl variant="outlined" className="input-select-field">
                  <div className="filter-label-text">Filter By</div>
                  <Select
                    value={type}
                    onChange={handleType}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: "new-password",
                    }}
                  >
                    {TYPES.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        disabled={option.placeHolder}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl variant="outlined" className="input-select-field">
                  <div className="filter-label-text">Filter Duration</div>
                  <Select
                    value={duration}
                    onChange={handleDuration}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: "new-password",
                    }}
                  >
                    {DURATION.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        disabled={option.placeHolder}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">User</StyledTableCell>
                    <StyledTableCell align="center">
                      Cheers Given
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Cheers Received
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderBoard.map((row) => (
                    <StyledTableRow key={row.slackUser.id}>
                      <StyledTableCell component="th" scope="row">
                        <div className="leader-name-container">
                          <Avatar
                            alt=""
                            src={row.slackUser.slackUserData.profile.image_192}
                          />
                          <div className="leader-name">
                            <span>{row.slackUser.slackUserData.real_name}</span>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <span className="leader-stats">{row.cheersGiven}</span>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <span className="leader-stats">
                          {row.cheersReceived}
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
                      count={leaderBoard.length}
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

            {!leaderBoard.length && !isLoading && (
              <div className="leaderboard-no-cheers-text">
                No cheers shared during this period!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardContainer;
