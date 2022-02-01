import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllUsersSaga } from "../state/actions";

export default function All() {
  const dispatch = useDispatch();

  const { users } = useSelector((state: any) => state.users);

  useEffect(() => {
    dispatch(getAllUsersSaga({}));
  }, []);

  return (
    <div>
      <TableContainer className="table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <span className="text-base font-semibold">User</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: any) => (
              <TableRow key={row?.slackUserData?.id}>
                <TableCell component="th" scope="row">
                  {row?.slackUserData?.profile?.real_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
