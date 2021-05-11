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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
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
