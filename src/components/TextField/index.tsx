import { alpha, styled } from "@mui/material/styles";
import MuiTextField from "@mui/material/TextField";

const TextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: 10,
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create(["background-color", "box-shadow"]),
    "&.Mui-focused": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 1px`,
    },
  },
}));

export default TextField;
